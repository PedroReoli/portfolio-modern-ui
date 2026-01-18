"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface CardBlobOverlayProps {
  isHovered: boolean
  className?: string
}

export default function CardBlobOverlay({ isHovered, className = "" }: CardBlobOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number>()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: width / height },
    }

    class Blob {
      renderer: THREE.WebGLRenderer
      fbTexture: { value: THREE.FramebufferTexture }
      rtOutput: THREE.WebGLRenderTarget
      uniforms: {
        pointer: { value: THREE.Vector2 }
        pointerDown: { value: number }
        pointerRadius: { value: number }
        pointerDuration: { value: number }
      }
      rtScene: THREE.Mesh
      rtCamera: THREE.Camera

      constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer
        this.fbTexture = { value: new THREE.FramebufferTexture(width, height) }
        this.rtOutput = new THREE.WebGLRenderTarget(width, height)
        this.uniforms = {
          pointer: { value: new THREE.Vector2().setScalar(10) },
          pointerDown: { value: 0 },
          pointerRadius: { value: 0.6 },
          pointerDuration: { value: 0.2 },
        }

        this.rtScene = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            onBeforeCompile: (shader) => {
              shader.uniforms.dTime = gu.dTime
              shader.uniforms.aspect = gu.aspect
              shader.uniforms.pointer = this.uniforms.pointer
              shader.uniforms.pointerDown = this.uniforms.pointerDown
              shader.uniforms.pointerRadius = this.uniforms.pointerRadius
              shader.uniforms.pointerDuration = this.uniforms.pointerDuration
              shader.uniforms.fbTexture = this.fbTexture
              shader.uniforms.time = gu.time
              shader.fragmentShader = `
                uniform float dTime, aspect, pointerDown, pointerRadius, pointerDuration, time;
                uniform vec2 pointer;
                uniform sampler2D fbTexture;
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
                  float a = hash(i); float b = hash(i + vec2(1.,0.)); float c = hash(i + vec2(0.,1.)); float d = hash(i + vec2(1.,1.));
                  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
                }
                ${shader.fragmentShader}
              `.replace(
                `#include <color_fragment>`,
                `#include <color_fragment>
                float rVal = texture2D(fbTexture, vUv).r;
                rVal -= clamp(dTime / pointerDuration, 0., 0.25);
                rVal = clamp(rVal, 0., 1.);
                float f = 0.;
                if (pointerDown > 0.5) {
                  vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
                  vec2 mouse = pointer * vec2(aspect, 1.);
                  vec2 toMouse = uv - mouse;
                  float angle = atan(toMouse.y, toMouse.x);
                  float dist = length(toMouse);
                  float noiseVal = noise(vec2(angle*3. + time*0.8, dist*4.));
                  float noiseVal2 = noise(vec2(angle*5. - time*0.5, dist*2.5 + time));
                  float radiusVariation = 0.8 + noiseVal*0.4 + noiseVal2*0.2;
                  float organicRadius = pointerRadius * radiusVariation;
                  f = 1. - smoothstep(organicRadius*0.02, organicRadius*1.5, dist);
                  f *= 0.9 + noiseVal*0.1;
                }
                rVal += f * 0.4;
                rVal = clamp(rVal, 0., 1.);
                diffuseColor.rgb = vec3(rVal);
                `,
              )
            },
          }),
        )
        this.rtScene.material.defines = { USE_UV: "" }
        this.rtCamera = new THREE.Camera()
      }

      render() {
        this.renderer.setRenderTarget(this.rtOutput)
        this.renderer.render(this.rtScene, this.rtCamera)
        this.renderer.copyFramebufferToTexture(this.fbTexture.value)
        this.renderer.setRenderTarget(null)
      }
    }

    const blob = new Blob(renderer)

    // Background plane com shader - Azul escuro
    const bgPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0x0a1a2e, transparent: true })
    bgPlaneMaterial.defines = { USE_UV: "" }

    bgPlaneMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.texBlob = { value: blob.rtOutput.texture }
      shader.uniforms.time = gu.time

      let vertexShader = shader.vertexShader
      vertexShader = vertexShader.replace("void main() {", "varying vec4 vPosProj;\nvoid main() {")
      vertexShader = vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvPosProj = gl_Position;",
      )
      shader.vertexShader = vertexShader

      shader.fragmentShader = `
        uniform sampler2D texBlob; 
        uniform float time; 
        varying vec4 vPosProj;

        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
        float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);float a=hash(i);float b=hash(i+vec2(1.,0.));float c=hash(i+vec2(0.,1.));float d=hash(i+vec2(1.,1.));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
        float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 4; i++) {
                value += amplitude * noise(p);
                p *= 2.1;
                amplitude *= 0.3;
            }
            return value;
        }

        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `
        vec2 blobUV=((vPosProj.xy/vPosProj.w)+1.)*0.5;
        vec4 blobData=texture(texBlob,blobUV);
        if(blobData.r<0.02)discard;
        diffuseColor.rgb = vec3(0.039, 0.102, 0.18); // Azul escuro #0a1a2e
        #include <clipping_planes_fragment>
        `,
      )
    }

    const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), bgPlaneMaterial)
    scene.add(bgPlane)
    
    // Variáveis para cleanup
    let blobInstance = blob

    let autoAnimationTime = 0
    let animationActive = false
    const clock = new THREE.Clock()
    let t = 0

    const animate = () => {
      const dt = clock.getDelta()
      t += dt
      gu.time.value = t
      gu.dTime.value = dt

      if (isHovered) {
        if (!animationActive) {
          // Iniciar animação apenas uma vez
          animationActive = true
          autoAnimationTime = 0
          setIsAnimating(true)
        }

        if (animationActive) {
          autoAnimationTime += dt
          const animationDuration = 0.6 // Velocidade reduzida um pouco
          const progress = Math.min(autoAnimationTime / animationDuration, 1.0)

          if (progress >= 1.0) {
            // Manter o overlay completamente preenchido após a animação
            blob.uniforms.pointerDown.value = 1
            // Centralizar e aumentar muito o raio para manter preenchido
            blob.uniforms.pointer.value.x = 0
            blob.uniforms.pointer.value.y = 0
            blob.uniforms.pointerRadius.value = 3.5 // Raio muito grande para cobrir tudo
            blob.uniforms.pointerDuration.value = 10.0 // Duração longa para manter visível
          } else {
            // Animação em espiral que preenche tudo
            const spiralTurns = 2.5
            const angle = progress * Math.PI * 2 * spiralTurns
            // Aumentar o raio máximo para garantir cobertura total
            const maxRadius = 2.2
            const radius = progress * maxRadius

            const spiralX = Math.cos(angle) * radius
            const spiralY = Math.sin(angle) * radius

            blob.uniforms.pointer.value.x = spiralX
            blob.uniforms.pointer.value.y = spiralY
            blob.uniforms.pointerDown.value = 1
            // Aumentar o raio do pointer progressivamente para preencher tudo
            blob.uniforms.pointerRadius.value = 0.8 + progress * 2.7
            blob.uniforms.pointerDuration.value = 0.2
          }
        }
      } else {
        // Quando sair do hover, resetar tudo
        if (animationActive) {
          animationActive = false
          setIsAnimating(false)
        }
        blob.uniforms.pointerDown.value = 0
        blob.uniforms.pointer.value.setScalar(10)
        blob.uniforms.pointerRadius.value = 0.6
        blob.uniforms.pointerDuration.value = 0.2
        autoAnimationTime = 0
      }

      blob.render()
      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.left = newWidth / -2
      camera.right = newWidth / 2
      camera.top = newHeight / 2
      camera.bottom = newHeight / -2
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
      gu.aspect.value = newWidth / newHeight

      bgPlane.geometry.dispose()
      bgPlane.geometry = new THREE.PlaneGeometry(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (rendererRef.current) {
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement)
        }
        rendererRef.current.dispose()
      }
      if (blobInstance) {
        blobInstance.rtOutput.dispose()
        blobInstance.fbTexture.value.dispose()
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })
    }
  }, [isHovered])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: isHovered || isAnimating ? 1 : 0, transition: "opacity 0.1s" }}
    />
  )
}

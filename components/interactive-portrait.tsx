// interactive-portrait.tsx

"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface InteractivePortraitProps {
  isInteractive?: boolean
}

export default function InteractivePortrait({ isInteractive = true }: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: width / height },
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

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
          pointerDown: { value: isInteractive ? 1 : 0 },
          pointerRadius: { value: 0.35 },
          pointerDuration: { value: 1.0 }, // Duração inicial mais curta
        }

        const handleMouseMove = (event: MouseEvent) => {
          if (!isInteractive) {
            this.uniforms.pointer.value.setScalar(10)
            this.uniforms.pointerDown.value = 0
            return
          }
          const rect = container.getBoundingClientRect()
          this.uniforms.pointer.value.x = ((event.clientX - rect.left) / width) * 2 - 1
          this.uniforms.pointer.value.y = -((event.clientY - rect.top) / height) * 2 + 1
          this.uniforms.pointerDown.value = 1
        }

        const handleMouseLeave = () => {
          this.uniforms.pointer.value.setScalar(10)
          if (isInteractive) {
            this.uniforms.pointerDown.value = 1
          } else {
            this.uniforms.pointerDown.value = 0
          }
        }

        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)
        
        // Atualizar pointerDown quando isInteractive mudar
        if (!isInteractive) {
          this.uniforms.pointerDown.value = 0
          this.uniforms.pointer.value.setScalar(10)
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
                rVal -= clamp(dTime / pointerDuration, 0., 0.05);
                rVal = clamp(rVal, 0., 1.);
                float f = 0.;
                if (pointerDown > 0.5) {
                  vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
                  vec2 mouse = pointer * vec2(aspect, 1.);
                  vec2 toMouse = uv - mouse;
                  float angle = atan(toMouse.y, toMouse.x);
                  float dist = length(toMouse);
                  float noiseVal = noise(vec2(angle*3. + time*0.5, dist*5.));
                  float noiseVal2 = noise(vec2(angle*5. - time*0.3, dist*3. + time));
                  float radiusVariation = 0.7 + noiseVal*0.5 + noiseVal2*0.3;
                  float organicRadius = pointerRadius * radiusVariation;
                  f = 1. - smoothstep(organicRadius*0.05, organicRadius*1.2, dist);
                  f *= 0.8 + noiseVal*0.2;
                }
                rVal += f * 0.25;
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
    
    // Controle para animação automática
    let autoAnimationTime = 0
    let autoAnimationActive = false
    let animationCompleted = false

    const textureLoader = new THREE.TextureLoader()
    // Usando hero-on como imagem principal
    const baseTexture = textureLoader.load("/images/hero-on.png", (texture) => {
      const img = texture.image
      const imgAspect = img.width / img.height
      const containerAspect = width / height
      let planeWidth, planeHeight
      if (imgAspect > containerAspect) {
        planeWidth = width
        planeHeight = width / imgAspect
      } else {
        planeHeight = height
        planeWidth = height * imgAspect
      }
      baseImage.geometry.dispose()
      baseImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
      helmetImage.geometry.dispose()
      helmetImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
    })

    // hero-off como imagem secundária (que aparece com a interação)
    const helmetTexture = textureLoader.load("/images/hero-off.png")

    baseTexture.colorSpace = THREE.SRGBColorSpace
    helmetTexture.colorSpace = THREE.SRGBColorSpace

    const baseImageMaterial = new THREE.MeshBasicMaterial({ map: baseTexture, transparent: true, alphaTest: 0.0 })
    const baseImage = new THREE.Mesh(new THREE.PlaneGeometry(width, height), baseImageMaterial)
    baseImage.visible = true // hero-on sempre visível por padrão
    scene.add(baseImage)

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

        // Função de ruído simples
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
        float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);float a=hash(i);float b=hash(i+vec2(1.,0.));float c=hash(i+vec2(0.,1.));float d=hash(i+vec2(1.,1.));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
        
        // Função de ruído orgânico (fBm)
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
        // A lógica da máscara continua a mesma
        vec2 blobUV=((vPosProj.xy/vPosProj.w)+1.)*0.5;
        vec4 blobData=texture(texBlob,blobUV);
        if(blobData.r<0.02)discard;

        // <<< LÓGICA ATUALIZADA PARA ANIMAÇÃO LÍQUIDA (DOMAIN WARPING) >>>

        // 1. Define as cores
        vec3 colorBg = vec3(1.0);
        vec3 colorSoftShape = vec3(0.92);
        vec3 colorLine = vec3(0.8);

        // 2. Coordenada base da textura (controla o "zoom")
        vec2 uv = vUv * 3.5;

        // 3. Cria um "campo de distorção" que muda com o tempo
        // Este é o nosso "líquido invisível" que vai mover a textura
        vec2 distortionField = vUv * 2.0;
        float distortion = fbm(distortionField + time * 0.2); // O campo de distorção se move lentamente

        // 4. Aplica a distorção (warp) às coordenadas da textura principal
        // Usamos o 'distortion' para empurrar as coordenadas 'uv'
        float distortionStrength = 0.7; // <-- CONTROLE A INTENSIDADE AQUI
        vec2 warpedUv = uv + (distortion - 0.5) * distortionStrength;
        
        // 5. Gera o valor final do ruído a partir das coordenadas distorcidas
        float n = fbm(warpedUv);

        // O resto da lógica para desenhar as formas e linhas permanece o mesmo
        float softShapeMix = smoothstep(0.1, 0.9, sin(n * 3.0));
        vec3 baseColor = mix(colorBg, colorSoftShape, softShapeMix);
        float linePattern = fract(n * 15.0);
        float lineMix = 1.0 - smoothstep(0.49, 0.51, linePattern);
        vec3 finalColor = mix(baseColor, colorLine, lineMix);

        diffuseColor.rgb = finalColor;
        #include <clipping_planes_fragment>
        `,
      )
    }

    const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), bgPlaneMaterial)
    scene.add(bgPlane)

    const helmetImageMaterial = new THREE.MeshBasicMaterial({ map: helmetTexture, transparent: true, alphaTest: 0.0 })

    helmetImageMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.texBlob = { value: blob.rtOutput.texture }
      let vertexShader = shader.vertexShader
      vertexShader = vertexShader.replace("void main() {", "varying vec4 vPosProj;\nvoid main() {")
      vertexShader = vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvPosProj = gl_Position;",
      )
      shader.vertexShader = vertexShader
      shader.fragmentShader = `
        uniform sampler2D texBlob; varying vec4 vPosProj;
        ${shader.fragmentShader}
      `.replace(
        `#include <clipping_planes_fragment>`,
        `
        vec2 blobUV=((vPosProj.xy/vPosProj.w)+1.)*0.5;
        vec4 blobData=texture(texBlob,blobUV);
        if(blobData.r<0.02)discard;
        #include <clipping_planes_fragment>
        `,
      )
    }

    const helmetImage = new THREE.Mesh(new THREE.PlaneGeometry(width, height), helmetImageMaterial)
    helmetImage.visible = false // hero-off começa oculto, só aparece com interação
    scene.add(helmetImage)

    // hero-on como base (sempre visível), hero-off aparece apenas com interação
    baseImage.position.z = 0.0
    bgPlane.position.z = 0.05
    helmetImage.position.z = 0.1
    
    // Inicialmente, hero-off está oculto
    if (!isInteractive) {
      helmetImage.visible = false
    }

    const clock = new THREE.Clock()
    let t = 0

    const animate = () => {
      const dt = clock.getDelta()
      t += dt
      gu.time.value = t
      gu.dTime.value = dt
      
      // Animação automática quando não for interativo
      if (!isInteractive && !animationCompleted) {
        autoAnimationActive = true
        autoAnimationTime += dt
        
        // Duração da animação (1.0 segundo - mais rápida)
        const animationDuration = 1.0
        const progress = Math.min(autoAnimationTime / animationDuration, 1.0)
        
        // Ocultar hero-off durante toda a animação - nunca mostrar
        helmetImage.visible = false
        
        if (progress >= 1.0) {
          animationCompleted = true
          autoAnimationActive = false
          // Após a animação, limpar o blob rapidamente para mostrar hero-on
          blob.uniforms.pointerDown.value = 0
          blob.uniforms.pointer.value.setScalar(10)
          // Reduzir drasticamente a duração para o blob desaparecer rápido
          blob.uniforms.pointerDuration.value = 0.5 // Muito mais rápido para desaparecer
          // Garantir que hero-off permaneça oculto e hero-on apareça
          helmetImage.visible = false
          baseImage.visible = true
        } else {
          // Criar uma animação que "varre" toda a imagem de forma sistemática
          // Padrão em espiral que cobre toda a área da imagem
          
          // Usar um padrão em espiral que se expande do centro
          const spiralTurns = 3 // Número de voltas da espiral
          const angle = progress * Math.PI * 2 * spiralTurns
          const radius = progress * 1.8 // Expandir do centro até cobrir toda a área
          
          // Calcular posição na espiral
          const spiralX = Math.cos(angle) * radius
          const spiralY = Math.sin(angle) * radius
          
          // Adicionar variação para cobrir melhor a área
          const waveOffset = Math.sin(progress * Math.PI * 4) * 0.3
          const finalX = spiralX + waveOffset
          const finalY = spiralY + waveOffset
          
          blob.uniforms.pointer.value.x = finalX
          blob.uniforms.pointer.value.y = finalY
          blob.uniforms.pointerDown.value = 1
          
          // Aumentar o raio do pointer durante a animação para cobrir mais área
          // Começa com raio normal e aumenta para cobrir toda a imagem
          blob.uniforms.pointerRadius.value = 0.35 + (progress * 1.2) // Aumenta o raio significativamente
          
          // Manter duração curta durante a animação para não demorar muito depois
          blob.uniforms.pointerDuration.value = 0.8 + (progress * 0.5) // Mais curto durante animação
        }
      } else if (isInteractive) {
        // Resetar animação quando voltar a ser interativo
        autoAnimationTime = 0
        animationCompleted = false
        autoAnimationActive = false
        blob.uniforms.pointerRadius.value = 0.35
        blob.uniforms.pointerDuration.value = 1.0
        // Mostrar helmetImage novamente quando voltar a ser interativo
        helmetImage.visible = true
        baseImage.visible = true
      }
      
      // Garantir visibilidade baseada no estado
      if (!isInteractive) {
        // Durante animação ou após completar, hero-off não aparece
        helmetImage.visible = false
        baseImage.visible = true
      } else if (isInteractive) {
        // Quando interativo, hero-off pode aparecer com interação
        helmetImage.visible = true
        baseImage.visible = true
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
      if (baseTexture.image) {
        const img = baseTexture.image
        const imgAspect = img.width / img.height
        const containerAspect = newWidth / newHeight
        let planeWidth, planeHeight
        if (imgAspect > containerAspect) {
          planeWidth = newWidth
          planeHeight = newWidth / imgAspect
        } else {
          planeHeight = newHeight
          planeWidth = newHeight * imgAspect
        }
        baseImage.geometry.dispose()
        baseImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
        helmetImage.geometry.dispose()
        helmetImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)

        bgPlane.geometry.dispose()
        bgPlane.geometry = new THREE.PlaneGeometry(newWidth, newHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
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
      baseTexture.dispose()
      helmetTexture.dispose()
      blob.rtOutput.dispose()
    }
  }, [isInteractive])
  
  // Resetar animação quando isInteractive mudar
  useEffect(() => {
    if (isInteractive) {
      // Resetar quando voltar a ser interativo
      const blobInstance = containerRef.current?.querySelector("canvas")?.dataset?.blobInstance
      // A lógica de reset é feita dentro do animate
    }
  }, [isInteractive])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full bg-[#0a1a2e] overflow-hidden ${isInteractive ? "cursor-crosshair" : "cursor-default"}`}
      style={{ touchAction: "none" }}
    >
      <img
        src="/images/inspired-by-lando-norris.png"
        alt="Inspired by Lorenzo"
        className="absolute bottom-4 left-4 z-10 pointer-events-none"
        style={{ maxWidth: "120px", width: "120px", height: "auto" }}
      />
    </div>
  )
}

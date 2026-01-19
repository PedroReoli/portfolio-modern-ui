"use client"

import React, { Suspense, useEffect, useState } from "react"

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshStandardMaterial color="#000000" wireframe />
    </mesh>
  )
}

export default function HelmetCanvas() {
  const [CanvasComponent, setCanvasComponent] = useState<React.ComponentType<any> | null>(null)
  const [Helmet3DModel, setHelmet3DModel] = useState<React.ComponentType<any> | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    setIsMounted(true)
    
    // Importação dinâmica apenas no cliente
    Promise.all([
      import("@react-three/fiber"),
      import("@react-three/drei"),
      import("./helmet-3d-model"),
    ]).then(([fiber, drei, helmetModule]) => {
      const { Canvas } = fiber
      const { Environment, PerspectiveCamera } = drei
      const HelmetModel = helmetModule.default

      // Criar componente wrapper
      const CanvasWrapper = () => (
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 6.5]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#C3271D" />
          <Suspense fallback={<LoadingFallback />}>
            <HelmetModel modelPath="/3d/helmet-lorenzo.glb" />
          </Suspense>
          <Environment preset="city" />
        </Canvas>
      )

      setCanvasComponent(() => CanvasWrapper)
    }).catch((error) => {
      console.error("Error loading 3D components:", error)
    })
  }, [])

  if (!isMounted || !CanvasComponent) {
    return null
  }

  return <CanvasComponent />
}
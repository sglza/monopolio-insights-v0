"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PropertyImage } from "@/lib/data"
import Image from "next/image"

interface PropertyGalleryProps {
  images: PropertyImage[]
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="bg-slate-100 h-[400px] flex items-center justify-center rounded-md">
            <p className="text-slate-500">No hay imágenes disponibles</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative">
          <div className="relative h-[400px] overflow-hidden rounded-md">
            <Image
              src={images[currentIndex].url || "/placeholder.svg"}
              alt={`Imagen ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>

          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={goToPrevious}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={goToNext}
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                  index === currentIndex ? "border-blue-600" : "border-transparent"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

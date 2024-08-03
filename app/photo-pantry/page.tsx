'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "@/firebase"
import { Container, Typography, Button } from "@mui/material"

export default function PhotoPantry() {

    const [images, setImages]: any = useState([])

    useEffect(() => {
        const fetchImages = async () => {
            const imagesRef = ref(storage, "images/")

            try {
                const result = await listAll(imagesRef)
                const urls = await Promise.all(result.items.map(item => getDownloadURL(item)))
                setImages(urls)
            } catch (error) {
                console.error("Error fetching images", error)
            }
        }

        fetchImages()
    }, []);

    return (
        <Container className="flex flex-col gap-2 justify-center items-center h-screen">
            <Typography className="text-4xl sm:text-8xl py-2" variant="h1" align="center">Photo Pantry</Typography>
            <div className="grid gap-2">
                {images.map((url: string, index: number) =>
                    <div key={url} className="">
                        <Image src={url} alt={"Image " + index} width={300} height={300} />
                    </div>
                )}
            </div>
        </Container>
    )
}

'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "@/firebase"
import { Container, Typography, Button } from "@mui/material"
import { Delete } from "@mui/icons-material"

export default function PhotoPantry() {
    // TODO: add delete functionality for images

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
        <Container className="flex flex-col gap-2 justify-center items-center min-h-screen bg-gradient-to-b to-gray-950 from-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-2">
                {images.map((url: string, index: number) =>
                    <div key={url} className="">
                        {/* TODO DELETE FUNCTION */}
                        <button className="absolute p-2 m-1 bg-gradient-radial from-gray-500 via-transparent to-transparent rounded-full"><Delete className=""/></button>
                        <Image src={url} className="rounded-xl" alt={"Image " + index} width={300} height={300} />
                    </div>
                )}
            </div>
        </Container>
    )
}

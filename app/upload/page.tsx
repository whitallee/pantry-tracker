'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "@/firebase"
import { Container } from "@mui/material"

export default function Upload() {

    const [images, setImages] = useState([])

    useEffect(() => {
        const fetchImages = async () => {
            const imagesRef = ref(storage, "images/")

            try {
                const result = await listAll(imagesRef)
                const urls = await Promise.all(result.items.map(item => getDownloadURL(item)))
                //pick up here 26:51
            } catch (error) {
                console.error("Error fetching images", error)
            }
        }
    })

    return (
        <Container className="flex flex-col gap-2 justify-center items-center h-screen">
            Upload
        </Container>
    )
}

'use client'

import Image from "next/image"
import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/firebase"
import { Container } from "@mui/material"

export default function PhotoPantry() {

    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl]: any = useState(null)

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) return

        setUploading(true)
        // @ts-ignore
        const filePath = 'images/' + file.name
        const storageRef = ref(storage, filePath)

        try {
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)
            setUploadedUrl(url)
            console.log("File loaded successfully")
        } catch (error) {
            console.error("Error uploading the file", error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Container className="flex flex-col gap-2 justify-center items-center h-screen">
            <input className="border-2 border-solid border-white p-2 rounded-md" type="file" onChange={handleFileChange}></input>
            <button className="border-2 border-solid border-white p-2 rounded-md" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            { uploadedUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <Image className="w-80 h-80 object-cover" src={uploadedUrl} alt="Uploaded Image" width={300} height={300}/>
                </div>
            )}
        </Container>
    )
}

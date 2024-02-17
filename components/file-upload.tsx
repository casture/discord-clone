'use client'

import { UploadDropzone } from "@/components/uploadthing"
import { X } from "lucide-react"
import Image from 'next/image'
import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
}

export const FileUpload = ({
    onChange,
    value
}: FileUploadProps) => {
    const fileType = value?.split('.').pop()
    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-20 w-20">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}
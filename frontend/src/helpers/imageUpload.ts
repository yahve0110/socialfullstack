import { MAX_FILE_SIZE_MB } from "@/globals"

interface FileWithSize extends File {
    size: number;
  }


export const handleFileChange = async (file: FileWithSize) => {
  if (file) {
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB >= MAX_FILE_SIZE_MB) {
        return false

    }

    const base64 = await convertToBase64(file)
    return base64
  }
}

const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

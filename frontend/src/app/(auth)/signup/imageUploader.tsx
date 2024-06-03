import React, { useCallback } from "react";
import styles from "./SignUp.module.css";

interface ImageUploaderProps {
    avatar: string;
    setAvatar: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImageUploader(props: ImageUploaderProps) {
    const { setAvatar } = props;

    const handleCreateBase64 = useCallback(async (e: React.ChangeEvent<HTMLInputElement> | File) => {
        let file: File;
        if (e instanceof File) {
            file = e;
        } else {
            const inputElement = e.target as HTMLInputElement;
            if (!inputElement.files || !inputElement.files[0]) {
                alert("Please select an image");
                return;
            }
            file = inputElement.files[0];
        }
        const base64 = await convertToBase64(file);
        setAvatar(base64);
        if (e instanceof Event) {
            const inputElement = e.target as HTMLInputElement;
            inputElement.value = "";
        }
    }, [setAvatar]);

    const convertToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (!file) {
            console.error("No file found in drop event");
            return;
        }
        await handleCreateBase64(file);
    };

    function activateImage() {
        const input = document.getElementById("input");
        input?.click();
    }

    return (
        <div
            className={styles.dragDiv}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                className={styles.avatarBtn}
                type="file"
                accept="image/*,png,jpeg,jpg"
                style={{ display: "none" }}
                onChange={handleCreateBase64}
                id="input"
            />
            <p className={styles.chooseImgText} onClick={activateImage}>Choose image</p>
        </div>
    );
}

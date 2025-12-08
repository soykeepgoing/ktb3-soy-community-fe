function convertFileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
        resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function handleImageChanged(event) {
    const file = event.target.files[0];
    const imageUrl = await convertFileToDataURL(file);
    return imageUrl;
};
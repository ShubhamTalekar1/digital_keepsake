export const removeBackground = (imageSrc: string, color: 'white' | 'green' = 'white', tolerance: number = 20): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                reject(new Error("Could not get canvas context"));
                return;
            }

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const width = canvas.width;
            const height = canvas.height;

            // Helper to check if a pixel matches the background color
            const isBackground = (r: number, g: number, b: number) => {
                if (color === 'white') {
                    return r > 255 - tolerance && g > 255 - tolerance && b > 255 - tolerance;
                } else {
                    // Green screen (bright green)
                    // Expect high G, low R and B
                    // e.g. R < 100, G > 200, B < 100
                    // Adjust tolerance for "green-ness"
                    return g > r + tolerance && g > b + tolerance && g > 150;
                }
            };

            // Flood fill from all 4 corners to catch background
            const queue: [number, number][] = [];
            const visited = new Set<string>();

            const add = (x: number, y: number) => {
                const key = `${x},${y}`;
                if (x < 0 || x >= width || y < 0 || y >= height || visited.has(key)) return;
                visited.add(key);

                const idx = (y * width + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];

                if (isBackground(r, g, b)) {
                    data[idx + 3] = 0; // Make transparent
                    queue.push([x, y]);
                }
            };

            // Start from corners
            add(0, 0);
            add(width - 1, 0);
            add(0, height - 1);
            add(width - 1, height - 1);

            while (queue.length > 0) {
                const [x, y] = queue.shift()!;
                add(x + 1, y);
                add(x - 1, y);
                add(x, y + 1);
                add(x, y - 1);
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
};

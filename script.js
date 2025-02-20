window.onload = function() {
            let canvas = document.getElementById('scratch-canvas');
            let ctx = canvas.getContext('2d');
            let scratchCard = document.getElementById('scratch-card');
            let giftBox = document.getElementById('gift-box');

            canvas.width = scratchCard.offsetWidth;
            canvas.height = scratchCard.offsetHeight;
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let isDrawing = false;

            function scratch(e) {
                if (!isDrawing) return;
                let rect = canvas.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();
            }

            function checkScratchCompletion() {
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixels = imageData.data;
                let cleared = 0;
                for (let i = 3; i < pixels.length; i += 4) {
                    if (pixels[i] === 0) cleared++;
                }
                if (cleared > pixels.length * 0.6 / 4) {
                    canvas.style.display = 'none';
                    giftBox.style.display = 'block';
                }
            }

            canvas.addEventListener('mousedown', () => isDrawing = true);
            canvas.addEventListener('mouseup', () => isDrawing = false);
            canvas.addEventListener('mousemove', (e) => {
                scratch(e);
                checkScratchCompletion();
            });
        };

        function showPopup() {
            document.getElementById('popup').style.display = 'block';
        }
        function closePopup() {
            document.getElementById('popup').style.display = 'none';
        }
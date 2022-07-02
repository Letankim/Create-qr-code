const containerApp = document.querySelector('.container'),
    input = document.querySelector('.infor-qr-code input'),
    btn = document.querySelector('.btn'),
    imgQr = document.querySelector('.qr-code img'),
    messageError = document.querySelector('.message-error');

btn.addEventListener('click', ()=> {
    createQrCode();
});
input.addEventListener('keydown', (event)=> {
    if(event.key === "Enter") {
        createQrCode();
    }
});

function createQrCode() {
    if (containerApp.classList.contains('active')) {
        btn.innerHTML = "Create QR Code";
        containerApp.classList.remove('active');
        input.value = "";
        return;
    };
    let valueInput = input.value;
    if (valueInput) {
        btn.innerHTML = "Please wait ....";
        imgQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${valueInput}`;
        imgQr.addEventListener('load', ()=> {
            containerApp.classList.add('active');
            btn.innerHTML = "Generated Successfully";
        });
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    };
};



input.oninput = function() {
    messageError.style.display = "none";
    btn.innerHTML = "Create QR Code";
    containerApp.classList.remove('active');
};
document.querySelector('a').onclick = function() {
    downloadImage(imgQr.src)
}

async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement('a');
    link.href = imageURL;
    const nameImg = image.url;
    const nameSave = nameImg.split(1)[3];
    link.download = nameSave.slice(8, nameSave.length);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
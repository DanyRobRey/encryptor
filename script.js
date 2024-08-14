const textArea = document.querySelector(".text-area");
const message = document.querySelector(".message");
const originalMessage = message.cloneNode(false);
const copyButton = document.querySelector(".copy-btn");
const additionalMessage = document.querySelector(".additional-message");
const oriAdditionalMessage = additionalMessage.cloneNode(true);

const matrixCode = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function countCharacters(text) {
    return text.length;
}


function btnEncrypt() {
    if (textArea.value != "") {
        const encryptedText = encrypt(textArea.value);
        message.value = encryptedText;
        textArea.value = "";
        message.style.backgroundImage = "none";
        additionalMessage.textContent = "";
        copyButton.style.display = 'block';
        if (window.innerWidth > 430 && window.innerWidth <= 768) {
            const charCount = countCharacters(encryptedText);
            const height = Math.max(200, charCount * 2.6);
            message.style.height = `${height}px`;
            copyButton.style.marginTop = `${height-190}px`; 
        }
        if (window.innerWidth <= 430) {
            const charCount = countCharacters(encryptedText);
            const height = Math.max(300, charCount * 7);
            message.style.height = `${height}px`;
            copyButton.style.marginTop = `${height-190}px`; 
        }
        
    } else {
        message.value = originalMessage.value;
        message.style.backgroundImage = originalMessage.style.backgroundImage;
        additionalMessage.textContent = oriAdditionalMessage.textContent;
        copyButton.style.display = 'none';
        if (window.innerWidth <= 768) {
            message.style.height = "133px";
        }
    }
}

function btnDecrypt() {
    if (textArea.value != "") {
        const decryptedText = decrypt(textArea.value);
        message.value = decryptedText;
        textArea.value = "";
        message.style.backgroundImage = "none";
        additionalMessage.textContent = "";
        copyButton.style.display = 'block';
        if (window.innerWidth > 430 && window.innerWidth <= 768) {
            const charCount = countCharacters(encryptedText);
            const height = Math.max(200, charCount * 2.6);
            message.style.height = `${height}px`;
            copyButton.style.marginTop = `${height-190}px`; 
        }
        if (window.innerWidth <= 430) {
            const charCount = countCharacters(encryptedText);
            const height = Math.max(300, charCount * 7);
            message.style.height = `${height}px`;
            copyButton.style.marginTop = `${height-190}px`; 
        }
    } else {
        message.value = originalMessage.value;
        message.style.backgroundImage = originalMessage.style.backgroundImage;
        additionalMessage.textContent = oriAdditionalMessage.textContent;
        copyButton.style.display = 'none';
        if (window.innerWidth <= 768) {
            message.style.height = "133px";
        }
    }
}

function copy() {
    var tempInput = document.createElement("input");
    tempInput.value = message.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    if (window.innerWidth > 768) {
        var popup = document.getElementById("popup");
        popup.style.display = "block";

        setTimeout(function () {
            popup.style.display = "none";
        }, 1000);
    }
}

function encrypt(data) {

    const lowercasedData = data.toLowerCase();

    return matrixCode.reduce((acc, [char, replacement]) => {
        return acc.replaceAll(char, replacement);
    }, lowercasedData);
}

function decrypt(data) {
    let decryptedData = data.toLowerCase();

    matrixCode.forEach(([char, encoded]) => {
        decryptedData = decryptedData.replace(new RegExp(encoded, 'g'), char);
    });

    return decryptedData;
}
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

function btnEncrypt() {
    if (textArea.value != "") {
        const encryptedText = encrypt(textArea.value);
        message.value = encryptedText;
        textArea.value = "";
        message.style.backgroundImage = "none";
        additionalMessage.textContent = "";
        copyButton.style.display = 'block';
    } else {
        message.value = originalMessage.value;
        message.style.backgroundImage = originalMessage.style.backgroundImage;
        additionalMessage.textContent = oriAdditionalMessage.textContent;
        copyButton.style.display = 'none';
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
    } else {
        message.value = originalMessage.value;
        message.style.backgroundImage = originalMessage.style.backgroundImage;
        additionalMessage.textContent = oriAdditionalMessage.textContent;
        copyButton.style.display = 'none';
    }
}

function copy() {
    var tempInput = document.createElement("input");
    tempInput.value = message.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    var popup = document.getElementById("popup");
    popup.style.display = "block";

    setTimeout(function () {
        popup.style.display = "none";
    }, 1000);
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
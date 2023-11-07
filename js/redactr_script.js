document.addEventListener("DOMContentLoaded", function() {
    const pasteFromClipboardButton = document.getElementById("pasteFromClipboard");
    const textToScramble = document.getElementById("textToScramble");
    const scrambleWords = document.getElementById("scrambleWords");
    const replacementChar = document.getElementById("replacementChar");
    const scrambleButton = document.getElementById("scrambleButton");
    const copyToClipboardButton = document.getElementById("copyToClipboard");
    const scrambledText = document.getElementById("scrambledText");
    const scrambleStats = document.getElementById("scrambleStats");

    pasteFromClipboardButton.addEventListener("click", async function() {
        try {
            const clipboardText = await navigator.clipboard.readText();
            textToScramble.value = clipboardText;
        } catch (error) {
            console.error("Failed to read text from clipboard:", error);
        }
    });

    copyToClipboardButton.addEventListener("click", async function() {
        const text = scrambledText.textContent;
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                alert("Scrambled text copied to clipboard!");
            } catch (error) {
                console.error("Failed to copy text to clipboard:", error);
            }
        }
    });

    scrambleButton.addEventListener("click", function() {
        const text = textToScramble.value;
        const wordsToScramble = scrambleWords.value.split(" ");
        const replaceChar = replacementChar.value;

        let numCharactersScrambled = 0;

        const startTime = new Date().getTime();
        let scrambledTextContent = text;

        if (text.length == 0 || replaceChar.length == 0){
            alert('Please provide the text to be filtered, word(s) to scramble and a replacement character!')
        } else {
        wordsToScramble.forEach(w => {
            const regex = new RegExp(w, "ig");

            const matches = text.match(regex);
            if (matches) {
                numCharactersScrambled += matches.reduce((total, match) => total + match.length, 0);
            }

            scrambledTextContent = scrambledTextContent.replace(regex, replaceChar.repeat(w.length));
        });

        const endTime = new Date().getTime();
        const elapsedTime = (endTime - startTime) / 1000;

        scrambledText.textContent = scrambledTextContent;          
        const showText = document.querySelectorAll('.hidden');
        showText.forEach((hidden) => {
            hidden.classList.remove('hidden');
          });
        

        scrambleStats.innerHTML = `
            Words Checked: ${wordsToScramble.length} | 
            Words Matched: ${wordsToScramble.length} | 
            Characters Scrambled: ${numCharactersScrambled} | 
            Time Taken: ${elapsedTime} seconds
        `;
    }
});
});

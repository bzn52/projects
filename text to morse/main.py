# Morse code dictionary for decoding
MORSE_CODE_DICT_REVERSED = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', 
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', 
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', 
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', 
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', 
    '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4', 
    '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', 
    '-----': '0', '|': ' '  # Space is represented by '|'
}

# Morse code dictionary for encoding
MORSE_CODE_DICT = {v: k for k, v in MORSE_CODE_DICT_REVERSED.items()}

# Function to decode Morse code into text
def decode_morse(morse_code):
    morse_symbols = morse_code.split(' ')
    decoded_message = ''
    for symbol in morse_symbols:
        decoded_message += MORSE_CODE_DICT_REVERSED.get(symbol, '')  # Default to empty string for unknown symbols
    return decoded_message.strip()  # Remove any leading/trailing whitespace

# Function to encode text into Morse code
def encode_to_morse(text):
    text = text.upper()  # Convert text to uppercase
    morse_code = ''
    for char in text:
        if char in MORSE_CODE_DICT:
            morse_code += MORSE_CODE_DICT[char] + ' '  # Add a space between Morse symbols
        elif char == ' ':
            morse_code += '| '  # Use '|' for spaces
    return morse_code.strip()  # Remove any trailing space

if __name__ == "__main__":
    print("Choose an option:")
    print("1. Decode Morse code to text")
    print("2. Encode text to Morse code")
    
    choice = input("Enter 1 or 2: ")

    if choice == '1':
        user_morse_code = input("Enter the Morse code you want to convert to text (use '|' for spaces): ")
        decoded_text = decode_morse(user_morse_code)
        print("Decoded Text:", decoded_text)
    elif choice == '2':
        user_text = input("Enter the text you want to convert to Morse code: ")
        morse_code = encode_to_morse(user_text)
        print("Morse Code:", morse_code)
    else:
        print("Invalid choice. Please enter 1 or 2.")
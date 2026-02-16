#!/usr/bin/env python3
import random
import string


def generate_password(length=12, use_uppercase=True, use_lowercase=True,
                      use_digits=True, use_special=True):
    """
    Generate a random password with specified criteria, ensuring at least one of
    each selected character type.

    Args:
        length: Length of the password (default: 12)
        use_uppercase: Include uppercase letters (default: True)
        use_lowercase: Include lowercase letters (default: True)
        use_digits: Include digits (default: True)
        use_special: Include special characters (default: True)

    Returns:
        str: Generated password
    """
    characters = ''
    password_chars = []

    if use_uppercase:
        characters += string.ascii_uppercase
        password_chars.append(random.choice(string.ascii_uppercase))
    if use_lowercase:
        characters += string.ascii_lowercase
        password_chars.append(random.choice(string.ascii_lowercase))
    if use_digits:
        characters += string.digits
        password_chars.append(random.choice(string.digits))
    if use_special:
        characters += string.punctuation
        password_chars.append(random.choice(string.punctuation))

    if not characters:
        raise ValueError("At least one character type must be selected")

    if length < len(password_chars):
        raise ValueError(
            "Length is too short to include all selected character types")

    remaining_length = length - len(password_chars)

    for _ in range(remaining_length):
        password_chars.append(random.choice(characters))

    random.shuffle(password_chars)
    return "".join(password_chars)


def main():
    print("Random Password Generator")
    print("-" * 40)

    # Generate passwords with different configurations
    print(f"Default (12 chars, all types): {generate_password()}")
    print(f"Strong (16 chars, all types):  {generate_password(16)}")
    print(
        f"Alphanumeric only (12 chars):  {generate_password(12, use_special=False)}")
    print(
        f"Letters only (12 chars):       {generate_password(12, use_digits=False, use_special=False)}")


if __name__ == "__main__":
    main()

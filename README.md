# AI & MCP Security Field Guide

**OWASP Top 10 for LLMs, Agents, and MCP** — A Plain-English Reference with Real-World Examples, Attack Walkthroughs, and Defensive Playbooks.

## Overview

This guide provides a comprehensive look at the security landscape for Large Language Models (LLMs), AI Agents, and the Model Context Protocol (MCP).

## How to View the Book

### Option 1: Live Website (Recommended)
You can view the interactive version of this book at:
[https://your-username.github.io/ai-security-book/](https://your-username.github.io/ai-security-book/) (Replace with your GitHub username once deployed)

### Option 2: Local Development
To run the book locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ai-security-book.git
   cd ai-security-book
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *(Note: You may need to create a requirements.txt file if it doesn't exist)*

4. Start the MkDocs server:
   ```bash
   mkdocs serve
   ```
5. Open `http://127.0.0.1:8000/` in your browser.

## Project Structure

- `docs/`: Contains the Markdown source files for the book.
- `mkdocs.yml`: Configuration for the MkDocs site and theme.
- `part1-8`: Organized chapters covering Foundations, OWASP Top 10s, and Playbooks.

## License

This work is licensed under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).

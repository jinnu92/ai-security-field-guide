# AI Security: The Field Guide to LLMs, Agents, and MCP

A plain-English reference for the OWASP Top 10 risks across Large Language Models, AI agents, and the Model Context Protocol, with real-world examples, attack walkthroughs, and defensive playbooks.

Read it online: https://jinnu92.github.io/ai-security-field-guide/

## Scope

The guide covers the security landscape for LLM applications, autonomous and tool-using agents, and MCP servers and clients. Each risk is presented three ways: what the weakness is in plain language, how it is exploited in practice, and which controls actually mitigate it.

## Contents

- Part 1: Foundations of AI and LLM security
- Parts 2-6: OWASP Top 10 for LLMs, Agents, and MCP, one risk per chapter
- Parts 7-8: Defensive playbooks and testing methodology

## Running the book locally

The book is built with MkDocs. Clone the repository and start a local server:

```bash
git clone https://github.com/jinnu92/ai-security-field-guide.git
cd ai-security-field-guide
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

The site is then served at http://127.0.0.1:8000/.

## Repository layout

- `docs/` - Markdown source for every chapter
- `book/` - assembled book output
- `scripts/` - build and validation helpers
- `mkdocs.yml` - site and theme configuration

## Contributing

Corrections, new attack walkthroughs, and additional references are welcome. See CONTRIBUTING.md before opening a pull request.

## License

Code and scripts in this repository are released under the MIT License (see LICENSE). The written content of the guide is licensed under Creative Commons Attribution 4.0 International.

# Appendix: Further Reading and Resources

This appendix collects the most important references, research papers, official standards, and tools related to AI and MCP security. Resources are organized by category and annotated with brief descriptions to help you find what you need quickly.

---

## Official OWASP Resources

### OWASP Top 10 for LLM Applications

- **[OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)** — The official list of the ten most critical risks in LLM-powered applications. Maintained by the OWASP GenAI Security Project. This is the primary source for Part 2 of this book.
  - Latest list: [genai.owasp.org/llm-top-10](https://genai.owasp.org/llm-top-10/)

### OWASP Top 10 for Agentic Applications

- **[OWASP Agentic Security Initiative (ASI)](https://genai.owasp.org/initiatives/agentic-security-initiative/)** — The working group that produced the Top 10 for Agentic Applications, focusing on risks specific to autonomous AI agents. This is the primary source for Part 3 of this book.

### OWASP MCP Top 10

- **[OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)** — The community-driven list of the ten most critical risks in Model Context Protocol deployments. This is the primary source for Part 4 of this book.

### Related OWASP Projects

- **[OWASP AI Security and Privacy Guide (AI Exchange)](https://owasp.org/www-project-ai-security-and-privacy-guide/)** — Comprehensive guidance on securing AI systems, covering a broader scope than the Top 10 lists.
- **[OWASP Machine Learning Security Top 10](https://owasp.org/www-project-machine-learning-security-top-10/)** — Focused specifically on machine learning pipeline risks (overlaps with but is distinct from the LLM Top 10).
- **[OWASP API Security Top 10](https://owasp.org/API-Security/)** — Relevant because MCP servers expose API-like interfaces and many of the same risks apply.

---

## Standards and Frameworks

### NIST AI Risk Management Framework (AI RMF 1.0)

The National Institute of Standards and Technology's framework for managing AI risks. Organized into four functions: Govern, Map, Measure, and Manage. Referenced throughout Part 8 of this book for control mappings.

- [NIST AI 100-1: AI Risk Management Framework](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [NIST AI 600-1: Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

### MITRE ATLAS (Adversarial Threat Landscape for AI Systems)

A knowledge base of adversary tactics, techniques, and case studies for AI/ML systems. Modeled after MITRE ATT&CK for traditional cybersecurity. Referenced in Part 8 for technique mappings.

- [MITRE ATLAS Matrix](https://atlas.mitre.org/)

### ISO/IEC Standards

- **ISO/IEC 42001:2023** — Information technology — Artificial intelligence — Management system. The first international standard for AI management systems.
- **ISO/IEC 23894:2023** — Information technology — Artificial intelligence — Guidance on risk management. Provides guidance on AI-specific risk management processes.
- **ISO/IEC 27001:2022** — Information security management systems. The foundational information security standard, applicable to AI systems as part of the broader IT infrastructure.

### EU AI Act

The European Union's regulatory framework for artificial intelligence. Establishes risk categories (unacceptable, high, limited, minimal) and compliance requirements for AI systems deployed in the EU. Relevant for understanding regulatory obligations around AI security.

---

## Research Papers

### Prompt Injection

- **["Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection"](https://arxiv.org/abs/2302.12173)** — Greshake et al., 2023. The foundational paper on indirect prompt injection attacks, demonstrating how attackers can compromise LLM applications through data sources rather than direct user input.

- **["Ignore This Title and HackAPrompt: Exposing Systemic Weaknesses of LLMs through a Global Scale Prompt Hacking Competition"](https://paper.hackaprompt.com/)** — Schulhoff et al., 2023. Analysis of thousands of prompt injection techniques from a global competition, providing a taxonomy of injection strategies.

- **["Prompt Injection Attack Against LLM-Integrated Applications"](https://arxiv.org/abs/2306.05499)** — Liu et al., 2023. Systematic study of prompt injection attack vectors and their effectiveness across different LLM architectures.

### Agent Security

- **["Identifying and Mitigating Vulnerabilities in LLM-Integrated Applications"](https://arxiv.org/abs/2311.16153)** — Wu et al., 2024. Framework for identifying security vulnerabilities in applications that integrate LLMs with external tools and data sources.

- **["RealToxicityPrompts: Evaluating Neural Toxic Degeneration in Language Models"](https://arxiv.org/abs/2009.11462)** — Gehman et al., 2020. Early work on evaluating how language models can be induced to generate harmful content.

### Articles and Commentary

- **["The Dual Use Dilemma of Artificial Intelligence"](https://www.forbes.com/sites/cognitiveworld/2019/01/07/the-dual-use-dilemma-of-artificial-intelligence/)** — Forbes, 2019. An accessible overview of dual-use risk framing for AI systems, useful for executive context.

### Data and Model Poisoning

- **["Poisoning Language Models During Instruction Tuning"](https://arxiv.org/abs/2305.00944)** — Wan et al., 2023. Demonstrates how attackers can compromise models during the fine-tuning phase by poisoning a small number of training examples.

- **["BadNets: Evaluating Backdooring Attacks on Deep Neural Networks"](https://doi.org/10.1109/ACCESS.2019.2909068)** — Gu et al., 2019. The foundational paper on neural network backdoor attacks through training data poisoning.

- **["TrojAI: Detecting Trojans in AI Models"](https://www.nist.gov/itl/ssd/trojai)** — NIST TrojAI program. Research program focused on developing methods to detect trojaned AI models.

### RAG and Embedding Security

- **["Poisoning Retrieval Corpora by Injecting Adversarial Passages"](https://arxiv.org/abs/2310.19156)** — Zhong et al., 2023. Demonstrates how attackers can poison RAG systems by injecting carefully crafted documents into the retrieval corpus.

- **["Adversarial Attacks on Embeddings: A Survey"](https://arxiv.org/html/2508.01845v1)** — Survey of techniques for attacking and defending embedding-based systems.

### MCP Security

- **["Model Context Protocol (MCP) Documentation"](https://docs.anthropic.com/en/docs/mcp)** — Anthropic documentation for MCP.

- **["Model Context Protocol Specification and Schema"](https://github.com/modelcontextprotocol/modelcontextprotocol)** — Official MCP specification, schema, and docs source.

---

## Tools and Projects

### Prompt Injection Testing

- **Garak** — LLM vulnerability scanner that automates testing for prompt injection, data leakage, and other LLM-specific vulnerabilities. Open source.

- **PyRIT (Python Risk Identification Toolkit)** — Microsoft's framework for identifying risks in generative AI systems. Supports automated red-teaming workflows.

- **Prompt Injection Detector** — Open-source tools for detecting prompt injection attempts in user input, using pattern matching, ML classifiers, and LLM-based judges.

### Agent Security Testing

- **AgentBench** — Benchmark suite for evaluating LLM agents across multiple dimensions including security, reliability, and capability.

- **AgentShield** — Open-source scanner for Claude Code configurations that detects security vulnerabilities, misconfigurations, and injection risks.

### MCP Security

- **MCP Inspector** — Official debugging tool for MCP servers that allows inspecting tool manifests, testing tool calls, and verifying server behavior.

- **MCP Registry Scanner** — Community tools for scanning MCP server registries for typosquatting, known vulnerabilities, and suspicious behavior patterns.

### General AI Security

- **OWASP AI Security Testing Guide** — Community-maintained guide for security testing AI applications, organized by vulnerability category.

- **AI Vulnerability Database (AVID)** — Open database of AI vulnerabilities, bias, and failure modes, organized using a structured taxonomy.

- **Counterfit** — Microsoft's tool for assessing the security of AI systems through adversarial attacks on ML models.

---

## Community Resources

### Conferences and Talks

- **DEF CON AI Village** — Annual hacking conference track focused on AI security, featuring talks, workshops, and live hacking challenges targeting AI systems.

- **Black Hat AI Security** — Sessions at Black Hat conferences focused on offensive and defensive AI security research.

- **OWASP Global AppSec** — OWASP's annual application security conferences, increasingly featuring AI security content.

- **NeurIPS ML Safety Workshop** — Academic workshop at the Neural Information Processing Systems conference focused on ML safety and security.

### Online Communities

- **OWASP Slack** — Active community discussions on AI security topics, with dedicated channels for LLM security, agent security, and MCP security.

- **AI Security subreddits and forums** — Community discussions on emerging threats, new research, and practical defence strategies.

### Training and Certifications

- **OWASP AI Security Fundamentals** — Foundation-level training on AI security concepts, covering the Top 10 lists and defensive practices.

- **SANS AI Security courses** — Professional training courses covering AI/ML security assessment and defence.

---

## Keeping Up to Date

AI security is a rapidly evolving field. New attack techniques, defence strategies, and vulnerability disclosures appear frequently. Here are recommendations for staying current:

1. **Subscribe to OWASP mailing lists** for the LLM, Agentic, and MCP Top 10 projects. These lists announce updates to the official lists and new guidance documents.

2. **Follow AI security researchers** on social media and academic preprint servers. Many new techniques are shared informally before formal publication.

3. **Monitor vulnerability databases** (CVE, AVID) for AI-specific vulnerability disclosures.

4. **Participate in CTF competitions** that include AI security challenges. These provide hands-on experience with emerging attack techniques.

5. **Review incident reports** as they are published. Real-world incidents often reveal attack patterns that are not yet documented in formal taxonomies.

---

**See also:** [Part 8 — Framework Mapping](part8-mapping/framework-comparison.md) for how these resources map to each other.

**See also:** [Index](index.md) for navigation to all sections of this book.

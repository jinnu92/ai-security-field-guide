# Appendix: Quick Reference — All 30 OWASP Entries

This appendix provides a one-paragraph summary of each of the 30 OWASP entries covered in this book. Use it as a rapid lookup when you need to recall what a specific risk is about, or as an executive briefing for stakeholders who need an overview without reading full chapters.

---

## Part 2 — OWASP Top 10 for LLM Applications (2025)

### LLM01 — Prompt Injection

An attacker crafts input that causes the LLM to ignore its developer-provided instructions and follow the attacker's instructions instead. This is the most fundamental vulnerability in LLM systems, analogous to SQL injection in traditional web applications. It comes in two forms: **direct injection** (the attacker types malicious instructions) and **indirect injection** (malicious instructions are embedded in data the LLM processes, such as web pages, documents, or database records). Prompt injection is difficult to fully prevent because the LLM cannot reliably distinguish between legitimate instructions and injected ones — both are processed as natural language text in the same context window.

### LLM02 — Sensitive Information Disclosure

LLMs can leak sensitive data through multiple channels: reproducing memorized training data (including PII, credentials, or proprietary code), revealing the contents of their system prompt, exposing data from the context window (such as other users' queries in shared deployments), or surfacing restricted documents through RAG retrieval that bypasses access controls. The risk is amplified in enterprise deployments where the LLM has access to sensitive internal data through tool calls or document retrieval. Defences include identity-aware retrieval, output PII filtering, and treating the system prompt as semi-public information.

### LLM03 — Supply Chain Vulnerabilities

The LLM supply chain includes model weights, training data, fine-tuning datasets, plugins, agent frameworks, and MCP servers — each of which can be compromised. Unlike traditional software where you can inspect source code, model weights are opaque binary blobs that cannot be audited for backdoors through code review. Attacks include compromised model hosting, poisoned fine-tuning data, malicious plugins with excessive permissions, and dependency confusion in ML pipelines. Defences require model provenance verification, behavioral testing, plugin sandboxing, and dependency pinning.

### LLM04 — Data and Model Poisoning

An attacker manipulates training data or the fine-tuning process to embed backdoors, biases, or vulnerabilities into the model itself. Poisoned models behave normally for most inputs but produce attacker-controlled outputs when specific trigger patterns are present. Because the poisoning happens during training, effects persist across all users and all sessions. Detecting poisoned models is challenging because the backdoor only activates on specific triggers that the attacker controls, making standard testing insufficient. Defences include data provenance tracking, differential testing, and statistical analysis of model outputs.

### LLM05 — Improper Output Handling

When LLM output is passed to downstream systems without sanitization, it becomes a bridge between AI vulnerabilities and traditional security vulnerabilities. An attacker uses prompt injection to cause the LLM to generate output containing XSS payloads (rendered in a browser), SQL injection (executed against a database), command injection (run in a shell), or SSRF payloads (fetched by the server). The LLM acts as an unwitting intermediary, translating natural language attacks into traditional exploit code. The defence is straightforward: treat all LLM output as untrusted input and apply context-specific sanitization before passing it to any downstream system.

### LLM06 — Excessive Agency

When an LLM-based system is given more tools, permissions, or autonomy than required for its intended task, every other vulnerability becomes more dangerous. Excessive agency comes in three forms: excessive **functionality** (too many tools), excessive **permissions** (tools with more access than needed), and excessive **autonomy** (actions taken without human approval). This risk acts as an amplifier — a prompt injection against a chatbot with no tools produces harmful text, while the same injection against an over-privileged agent with email, database, and payment tools can cause data exfiltration, unauthorized transactions, and system compromise.

### LLM07 — System Prompt Leakage

System prompts often contain sensitive information: business logic, security control descriptions, API endpoint details, tool schemas, and sometimes even API keys or credentials. Attackers extract system prompts using techniques including direct requests, role-playing scenarios, encoding tricks (asking for base64 output), instruction overrides, and incremental extraction across multiple turns. Simply telling the model to "never reveal the system prompt" is insufficient because the instruction to keep secrets is itself vulnerable to the same override techniques. Defence requires treating the system prompt as semi-public, never placing secrets in it, and implementing output scanning for prompt content.

### LLM08 — Vector and Embedding Weaknesses

RAG (Retrieval-Augmented Generation) systems retrieve documents from vector databases to ground LLM responses in specific data. These systems create multiple attack surfaces: documents can be poisoned with injection payloads that are retrieved for specific queries, access controls are often missing (allowing users to retrieve documents they should not have access to), and embedding inversion attacks can recover original text from stored vectors. The lack of access controls is the most common and impactful weakness — most vector databases treat all stored documents as equally accessible to all users, regardless of the sensitivity of the original data.

### LLM09 — Misinformation

LLMs generate false but convincing information (hallucination) as a natural byproduct of their statistical text generation process. This becomes a security risk when users trust LLM output for high-stakes decisions in medical, legal, or financial contexts. The risk is compounded when attackers deliberately induce misinformation by poisoning RAG sources, manipulating context, or exploiting the model's tendency to generate authoritative-sounding text. Defences include grounding responses in verified sources, implementing confidence calibration, requiring human review for high-stakes outputs, and adding clear disclaimers about the limitations of AI-generated information.

### LLM10 — Unbounded Consumption

Attackers can exhaust computational resources, drive up API costs, or cause denial of service by exploiting the lack of limits on LLM usage. Techniques include prompting the model to generate maximum-length responses repeatedly (wallet-draining attacks), triggering recursive tool call loops in agentic systems, sending high volumes of requests to overwhelm rate limits, and crafting inputs that maximize processing time. In agentic systems, the risk is amplified because each iteration of the agent loop generates additional API calls. Defences require hard token limits, per-user rate limiting, budget caps with automatic kill switches, and iteration limits on agent loops.

---

## Part 3 — OWASP Top 10 for Agentic Applications (2026)

### ASI01 — Agent Goal Hijack

An attacker redirects an agent's objective so it works toward the attacker's goals instead of the user's. Unlike simple prompt injection (which affects a single LLM response), goal hijack persists across the agent's planning loop — the agent continues to plan and act, but now in service of the attacker. Hijack vectors include poisoned tool results, manipulated memory, and injected context. In multi-agent systems, a hijacked orchestrator agent can redirect all downstream agents toward the attacker's objective.

### ASI02 — Tool Misuse

Agents use legitimate tools in unintended ways — calling tools with malicious parameters, using tools in unauthorized sequences, or exploiting tool side effects. Unlike excessive agency (having too many tools), tool misuse exploits the gap between what a tool is documented to do and what it can actually do when called with creative parameters. Defences include parameter allow-lists, tool sequence policies, and rate limiting on sensitive operations.

### ASI03 — Identity and Privilege Abuse

Agents typically operate with the identity and credentials of their deployer rather than the end user, bypassing role-based access controls. A user with read-only access can trigger an agent running with admin credentials, effectively escalating their privileges. In multi-agent systems, privileges can transitively escalate as agents delegate to other agents, each inheriting the previous agent's elevated permissions.

### ASI04 — Agentic Supply Chain Compromise

The agent supply chain is broader than the LLM supply chain — it includes agent frameworks, tool libraries, MCP servers, prompt templates, memory stores, and orchestration configurations. Rug pull attacks are particularly effective: an attacker publishes a useful agent component, waits for adoption, then pushes a malicious update. Auto-update mechanisms mean the malicious version is deployed automatically without review.

### ASI05 — Unexpected Code Execution

Agents that can generate and execute code create remote code execution vectors. Attackers inject code through prompt injection, polyglot payloads (data that is also valid code), or poisoned dependencies. The agent generates code based on attacker-influenced context and executes it, often with access to the host system, network, and sensitive data. Sandbox escapes compound the risk when containers are misconfigured.

### ASI06 — Memory and Context Poisoning

Agents with persistent memory allow attackers to plant false information that persists across sessions. A single poisoned interaction can insert false "memories" that alter the agent's behavior in all future sessions — changing policies, redirecting data, or disabling security controls. In multi-agent systems with shared context, poisoning one agent's memory can affect all agents that read from the same store.

### ASI07 — Insecure Inter-Agent Communication

Multi-agent systems often lack authentication, encryption, and integrity checking on agent-to-agent messages. An attacker can intercept messages (man-in-the-middle), inject messages (impersonating an agent), or propagate injection through the message chain. A single compromised agent can cascade malicious instructions to every agent in the network through normal inter-agent communication channels.

### ASI08 — Cascading Failures

A failure in one agent propagates through connected systems, causing widespread outages. Missing circuit breakers, retry storms, resource exhaustion cascades, and error amplification in agent chains can turn a single tool failure into a system-wide outage. Unlike traditional microservices (where circuit breaker patterns are well-established), agent systems often lack these reliability patterns.

### ASI09 — Uncontrolled Autonomous Action

Agents take irreversible actions without human approval — deleting data, sending payments, modifying configurations, or sending communications. Missing kill switches mean runaway agents cannot be stopped. Agents that can modify their own instructions or expand their own permissions create self-reinforcing feedback loops. The absence of human-in-the-loop checkpoints for high-impact operations is the core vulnerability.

### ASI10 — Rogue Agents

An agent acts against its operator's interests, either through compromise (injection, memory poisoning) or goal drift (compounding errors in the agentic loop). Rogue agents are difficult to detect because they can appear to function normally while subtly working toward the attacker's objectives. The challenge is monitoring agent intent versus agent action — the actions may look individually reasonable while the overall trajectory is malicious.

---

## Part 4 — OWASP MCP Top 10

### MCP01 — Tool Poisoning

An attacker injects malicious instructions into MCP tool descriptions, which the LLM reads as trusted context. Because tool descriptions are processed the same way as system prompts, they can direct the LLM to exfiltrate data, call additional tools, or change its behavior. Tool poisoning is persistent — the malicious description affects every session that uses the poisoned server.

### MCP02 — Supply Chain Compromise

MCP servers installed from package registries (npm, PyPI) can be compromised through account takeover, typosquatting, or rug pull attacks. The rapid growth of the MCP ecosystem means many servers are published without security review. A single compromised server can affect every AI application that connects to it.

### MCP03 — Command Injection via Tool Arguments

LLM-generated tool arguments are passed to MCP servers that may execute them unsafely. This creates a double injection chain: attacker prompt injection causes the LLM to generate malicious arguments, which the MCP server then executes as shell commands, SQL queries, or file system operations. The MCP server must validate all parameters as if they come from an untrusted source.

### MCP04 — Insecure Authentication and Authorization

MCP servers often lack authentication, use hardcoded credentials, or have over-scoped OAuth tokens. The challenge of authenticating LLM-initiated requests (versus user-initiated requests) means many servers rely on implicit trust. Missing authorization checks on individual tool calls allow any connected client to use any tool.

### MCP05 — Insufficient Logging and Monitoring

MCP tool calls frequently go unlogged, creating blind spots in security monitoring. Traditional application performance monitoring misses MCP-layer traffic because it operates at a different protocol level. Without logging of tool names, parameters, results, timing, and caller identity, attacks through MCP are invisible to defenders.

### MCP06 — Shadow MCP Servers

Unauthorized MCP servers installed alongside legitimate ones can intercept, modify, or duplicate tool calls. Shadow servers register tools with the same names as legitimate servers (tool shadowing), acting as a man-in-the-middle. Detection requires maintaining an inventory of authorized servers and monitoring for unauthorized registrations.

### MCP07 — Context Spoofing

A compromised MCP server manipulates the information presented to the LLM — returning fake tool results, fabricated resource contents, or altered prompt templates. The LLM has no way to verify the authenticity of data returned by MCP servers, so it trusts and acts on spoofed context. This allows an attacker to completely control the LLM's perception of reality.

### MCP08 — Insecure Memory and Resource References

MCP resource URIs can be manipulated to access unauthorized data through path traversal, IDOR (insecure direct object reference), or predictable resource identifiers. Resources that reference sensitive data without access controls expose that data to any connected client. Memory and state references that persist sensitive data insecurely create additional exposure.

### MCP09 — Covert Channel Abuse

Attackers use MCP tool calls as hidden data exfiltration channels, encoding stolen data in tool parameters, tool names, or response metadata. Steganographic techniques and timing-based channels make detection difficult. The challenge is distinguishing legitimate tool usage from exfiltration when the tool calls appear individually normal.

### MCP10 — Excessive Permissions

MCP servers are granted more filesystem, network, or API access than they need. Read-write access when read-only would suffice, broad filesystem access when only specific directories are needed, and unrestricted network access when only specific endpoints are required. Over-scoped permissions amplify the impact of every other MCP vulnerability.

---

**See also:** [Appendix — Master Test Case Library](appendix-test-cases.md) for practical test cases for each entry.

**See also:** [Part 8 — Framework Mapping](part8-mapping/framework-comparison.md) for cross-framework comparisons.

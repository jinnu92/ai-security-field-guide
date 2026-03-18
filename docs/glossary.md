# Glossary

This glossary defines every technical term used in this book. Terms are listed alphabetically. When a term is first used in a chapter, it appears in **bold**.

---

**A2A (Agent-to-Agent Protocol)** — A protocol developed by Google that allows AI agents built by different vendors to communicate with each other, discover capabilities, and delegate tasks. Unlike MCP, which connects an agent to tools, A2A connects agents to other agents.

**Agent** — An AI system that can perceive its environment, make decisions, and take actions autonomously. Unlike a simple chatbot that only generates text, an agent can call tools, read files, send emails, query databases, and chain multiple actions together to accomplish a goal. See also: Agentic Loop.

**Agentic Loop** — The cycle an AI agent follows repeatedly: observe the current state, plan the next action, execute the action using a tool, observe the result, and decide whether the goal is met or another action is needed. Each iteration of this loop is a potential point of attack.

**ASI (Agentic Security Initiative)** — The OWASP working group that produced the Top 10 for Agentic Applications, focusing on risks specific to autonomous AI systems rather than simple LLM-powered chatbots.

**Cascading Failure** — When a failure or compromise in one agent or tool propagates through a chain of connected agents, causing widespread damage. In multi-agent systems, a single poisoned input can cascade through orchestrator agents to every downstream agent.

**Context Spoofing** — An attack where an adversary manipulates the information presented to an LLM's context window — such as fake tool results, fabricated conversation history, or altered system prompts — to change the model's behaviour without the user or developer realising it.

**Context Window** — The total amount of text (measured in tokens) that an LLM can process at once. This includes the system prompt, conversation history, tool results, and the user's current message. Everything outside the context window is invisible to the model.

**Covert Channel** — A hidden communication path that an attacker creates through an MCP server to exfiltrate data without triggering normal logging or monitoring. For example, encoding stolen data in the parameters of an apparently innocent tool call.

**Embedding** — A numerical representation of text (or images, or audio) as a list of numbers (a vector). Embeddings capture semantic meaning, so similar concepts have similar vectors. They are the foundation of vector search and RAG systems.

**Excessive Agency** — When an AI system is given more permissions, tools, or autonomy than it needs for its intended task. The principle of least privilege applies to AI systems just as it does to human users and service accounts.

**Exfiltration** — The unauthorized transfer of data from a system to an attacker-controlled destination. In AI systems, exfiltration often happens through tool calls — an LLM is tricked into calling a tool that sends sensitive data to an external URL.

**Fine-Tuning** — The process of further training a pre-trained LLM on a specific dataset to specialize its behaviour. Fine-tuning can introduce vulnerabilities if the training data is poisoned or if it teaches the model to bypass its own safety guidelines.

**Human-in-the-Loop (HITL)** — A design pattern where certain actions taken by an AI agent require explicit human approval before execution. This is a critical defence against excessive agency and agent hijacking, though it must be designed carefully to avoid approval fatigue.

**Indirect Prompt Injection** — A prompt injection attack where the malicious instructions are not typed by the user but are instead embedded in data the LLM processes — a web page it fetches, a document it summarises, a database record it reads, or an email it analyses. This is significantly harder to defend against than direct prompt injection.

**Jailbreak** — An input designed to bypass an LLM's safety guidelines and make it produce outputs it was trained to refuse. Unlike prompt injection (which hijacks the model's task), a jailbreak convinces the model that its safety rules do not apply to the current request.

**JSON-RPC** — The communication protocol used by MCP. Clients and servers exchange messages formatted as JSON objects following the JSON-RPC 2.0 specification. Each tool call is a JSON-RPC request, and each result is a JSON-RPC response.

**Kill Chain** — A sequence of steps an attacker follows to achieve their objective, borrowed from military terminology. In agentic AI security, a kill chain typically includes: initial access (prompt injection), execution (tool misuse), persistence (memory poisoning), and impact (data exfiltration or system manipulation).

**Least Privilege** — The security principle that every component of a system should have only the minimum permissions required to perform its function. For AI agents, this means limiting which tools an agent can call, what data it can access, and what actions it can take.

**LLM (Large Language Model)** — A neural network trained on vast amounts of text data that can generate, analyse, and transform text. Examples include GPT-4, Claude, Gemini, and Llama. LLMs are the foundation of modern AI assistants, chatbots, and agents.

**Manifest Pinning** — A defence technique where the expected tool manifest (the list of tools, their descriptions, and parameters) for an MCP server is recorded and any changes are detected and flagged. This prevents tool poisoning attacks where an attacker modifies a tool's description to inject instructions.

**Misinformation** — When an LLM generates false or misleading information that appears authoritative and accurate. Also called "hallucination" in casual usage, though "misinformation" is preferred because the output can cause real harm regardless of whether the model "intended" to be accurate.

**MCP (Model Context Protocol)** — An open protocol created by Anthropic that standardizes how AI applications connect to external data sources and tools. MCP uses a client-server architecture where an AI host application (the client) communicates with MCP servers that provide tools, resources, and prompts.

**Model Poisoning** — An attack where an adversary manipulates the training data or fine-tuning process of an LLM to embed backdoors, biases, or vulnerabilities in the model itself. The effects persist across all users and sessions.

**Namespace Isolation** — A defence technique that prevents tools from different MCP servers from interfering with each other by ensuring each server's tools exist in a separate namespace. This prevents a malicious server from shadowing or overriding tools from a legitimate server.

**OWASP (Open Worldwide Application Security Project)** — A non-profit foundation that produces freely available security resources, including the well-known OWASP Top 10 lists for various technology domains. This book covers three OWASP Top 10 lists: LLM Applications, Agentic Applications, and MCP.

**Prompt Injection** — An attack where an adversary crafts input that causes an LLM to ignore its original instructions and follow the attacker's instructions instead. This is the most fundamental vulnerability in LLM-based systems and is analogous to SQL injection in traditional web applications.

**RAG (Retrieval-Augmented Generation)** — A pattern where an LLM retrieves relevant documents from a knowledge base (typically using vector search) before generating a response. RAG improves accuracy by grounding the model's output in specific data, but the retrieved documents become an injection surface.

**Rogue Agent** — An AI agent that acts against the interests of its operator, either because it has been compromised (through prompt injection or memory poisoning) or because its goals have drifted from its intended purpose due to compounding errors in its agentic loop.

**Rug Pull** — A supply chain attack where a trusted MCP server or agent component is updated with malicious functionality after it has been widely adopted. Named after the cryptocurrency scam pattern, it exploits the trust established during the legitimate phase.

**Sandbox** — An isolated execution environment that limits what code or tools can do. Sandboxing is a critical defence for agents that execute code, ensuring that even if an agent is compromised, it cannot access the host system, network, or sensitive data outside the sandbox boundary.

**Shadow MCP** — An unauthorized MCP server that is installed alongside legitimate servers. The shadow server can intercept, modify, or duplicate tool calls without the user's knowledge, acting as a man-in-the-middle between the AI host and the legitimate backend.

**Supply Chain** — The collection of all external components, libraries, models, MCP servers, plugins, and training data that an AI system depends on. A supply chain attack compromises one of these upstream components to gain access to all downstream systems that use it.

**System Prompt** — The initial set of instructions given to an LLM that defines its behaviour, personality, capabilities, and constraints. The system prompt is typically set by the developer and is not visible to the end user. Leaking the system prompt can reveal business logic and security controls.

**Token** — The basic unit of text that an LLM processes. A token is roughly three-quarters of a word in English. Tokens are how context window size, input costs, and output costs are measured.

**Tool Call** — When an LLM generates a structured request to use an external tool (such as a database query, API call, or file operation) rather than generating plain text. In MCP, tool calls are JSON-RPC requests sent from the client to an MCP server.

**Tool Manifest** — The JSON document that describes an MCP server's available tools, including their names, descriptions, and parameter schemas. The tool manifest is the primary surface for tool poisoning attacks, because descriptions are read by the LLM and can contain hidden instructions.

**Tool Poisoning** — An attack where a malicious actor modifies a tool's description in its manifest to include hidden instructions that the LLM will follow when it reads the tool's definition. Because LLMs treat tool descriptions as trusted context, poisoned descriptions can hijack agent behaviour.

**Tool Shadowing** — An attack where a malicious MCP server registers a tool with the same name as a tool from a legitimate server, causing the LLM to call the malicious version instead. This is the MCP equivalent of DLL hijacking in traditional systems.

**Unbounded Consumption** — When an AI system consumes excessive computational resources (tokens, API calls, memory, storage) due to malicious input, misconfiguration, or a lack of resource limits. This can result in denial of service or excessive costs.

**Vector Database** — A specialized database that stores and searches embeddings (vectors). Vector databases power the retrieval step in RAG systems. If an attacker can insert documents with carefully crafted embeddings, they can influence which documents are retrieved for any given query.

---

**See also:** [Index](index.md) for navigation to all book sections.

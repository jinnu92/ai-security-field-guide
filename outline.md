**File 2: `outline.md`** — the complete chapter map
```markdown
# Complete Book Outline

## File writing order — generate in this exact sequence

### Front matter
- docs/index.md
  Title page, introduction, how to use this book, 
  audience guide (builder / defender / executive)

- docs/glossary.md
  At least 40 terms: LLM, MCP, agent, tool call, 
  RAG, prompt injection, context window, jailbreak, 
  rug pull, tool shadowing, indirect injection, 
  tool manifest, OWASP, ASI, fine-tuning, embedding, 
  vector database, system prompt, agentic loop, 
  kill chain, least privilege, supply chain, 
  exfiltration, sandbox, namespace isolation, 
  manifest pinning, human-in-the-loop, A2A, 
  JSON-RPC, tool poisoning, covert channel, 
  context spoofing, rogue agent, cascading failure, 
  shadow MCP, excessive agency, misinformation, 
  unbounded consumption, model poisoning

### Part 1 — Foundations
- docs/part1/ch01-what-is-an-llm.md
  How LLMs work in plain English, context windows, 
  why LLMs are a new attack surface, real product 
  examples, diagram: input → context → output

- docs/part1/ch02-what-is-an-agent.md
  Chatbot vs agent, how agents plan and use tools, 
  the autonomy spectrum, why agents are higher risk, 
  diagram: observe → plan → act → observe loop

- docs/part1/ch03-what-is-mcp.md
  What MCP is and why it was created, how servers 
  tools resources and prompts work, how a host 
  connects to a server, the trust model and where 
  it breaks, diagram: LLM host ↔ MCP server ↔ 
  backends, real MCP server examples

### Part 2 — OWASP Top 10 for LLM Applications 2025
For each entry write: plain-English explanation, 
how the attack works step by step, concrete scenario 
with named characters, ASCII attack flow diagram, 
what the attacker gains, 5 test cases, 5+ defensive 
controls, severity and stakeholders, red flag checklist

- docs/part2-llm/llm01-prompt-injection.md
- docs/part2-llm/llm02-sensitive-information-disclosure.md
- docs/part2-llm/llm03-supply-chain.md
- docs/part2-llm/llm04-data-model-poisoning.md
- docs/part2-llm/llm05-improper-output-handling.md
- docs/part2-llm/llm06-excessive-agency.md
- docs/part2-llm/llm07-system-prompt-leakage.md
- docs/part2-llm/llm08-vector-embedding-weaknesses.md
- docs/part2-llm/llm09-misinformation.md
- docs/part2-llm/llm10-unbounded-consumption.md

### Part 3 — OWASP Top 10 for Agentic Applications 2026
Same format as Part 2, plus: how it differs from 
the equivalent LLM risk, multi-agent scenario, 
kill chain mapping (initial access → execution → 
impact)

- docs/part3-agentic/asi01-agent-goal-hijack.md
- docs/part3-agentic/asi02-tool-misuse.md
- docs/part3-agentic/asi03-identity-privilege-abuse.md
- docs/part3-agentic/asi04-agentic-supply-chain.md
- docs/part3-agentic/asi05-unexpected-code-execution.md
- docs/part3-agentic/asi06-memory-context-poisoning.md
- docs/part3-agentic/asi07-insecure-inter-agent-comms.md
- docs/part3-agentic/asi08-cascading-failures.md
- docs/part3-agentic/asi09-uncontrolled-autonomous-action.md
- docs/part3-agentic/asi10-rogue-agents.md

### Part 4 — OWASP MCP Top 10
Same format as Part 2, plus: specific MCP 
JSON-RPC surface being attacked, sample malicious 
tool manifest JSON, detection signature (log entry 
or behavior pattern)

- docs/part4-mcp/mcp01-tool-poisoning.md
- docs/part4-mcp/mcp02-supply-chain-compromise.md
- docs/part4-mcp/mcp03-command-injection.md
- docs/part4-mcp/mcp04-insecure-auth.md
- docs/part4-mcp/mcp05-insufficient-logging.md
- docs/part4-mcp/mcp06-shadow-mcp-servers.md
- docs/part4-mcp/mcp07-context-spoofing.md
- docs/part4-mcp/mcp08-insecure-memory-references.md
- docs/part4-mcp/mcp09-covert-channel-abuse.md
- docs/part4-mcp/mcp10-excessive-permissions.md

### Part 5 — Cross-cutting attack patterns
- docs/part5-patterns/indirect-prompt-injection.md
  Full story: web fetch attack, email/calendar 
  attack, RAG poisoning, database record injection, 
  why harder to defend than direct injection, 
  10 test cases with payloads, complete defensive 
  architecture

- docs/part5-patterns/injection-firewall.md
  What it is, three implementation tiers 
  (regex / classifier / LLM judge), 
  self-referential attack against the firewall, 
  bypass technique taxonomy, when to use each tier

- docs/part5-patterns/multi-agent-attack-chains.md
  How injection propagates across agent networks, 
  trust delegation vulnerabilities, 
  orchestrator/subagent poisoning, case study: 
  one poisoned document compromises entire 
  enterprise workflow

### Part 6 — Defensive playbooks
- docs/part6-playbooks/playbook-llm-app.md
  Securing an LLM-powered application: input 
  validation, output sanitization, system prompt 
  hardening, monitoring and alerting

- docs/part6-playbooks/playbook-agent.md
  Securing an AI agent deployment: least privilege, 
  human-in-the-loop checkpoints, audit logging 
  requirements, kill switch design

- docs/part6-playbooks/playbook-mcp.md
  Securing MCP server deployments: manifest review, 
  manifest pinning and change detection, namespace 
  isolation, credential handling

- docs/part6-playbooks/red-team-checklist.md
  50 test cases organized by attack surface, 
  severity rating for each, pass/fail criteria

### Part 7 — Real-world incidents timeline
- docs/part7-incidents/incidents-timeline.md
  Chronological incidents 2023–2025: EchoLeak, 
  postmark-mcp npm incident, Gemini memory attack, 
  Amazon Q tool misuse, AutoGPT RCE, GitHub MCP 
  exploit, CVE-2025-6514 MCP Remote RCE, plus 
  5 others. For each: what happened, OWASP mapping, 
  what would have prevented it

### Part 8 — Framework mapping
- docs/part8-mapping/framework-comparison.md
  Side-by-side table: LLM Top 10 vs Agentic Top 10 
  vs MCP Top 10, MITRE ATLAS mappings, NIST AI RMF 
  1.0 control mappings, how to use frameworks 
  together

### Back matter
- docs/appendix-test-cases.md
  Master test case library: all test cases from 
  the book in one consolidated table

- docs/appendix-quick-reference.md
  One-paragraph summary of all 30 OWASP entries

- docs/appendix-resources.md
  Further reading, official OWASP links, 
  research papers, tools`

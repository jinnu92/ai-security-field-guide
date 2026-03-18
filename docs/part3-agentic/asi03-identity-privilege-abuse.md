## ASI03 — Identity and Privilege Abuse

### Why This Matters

When a human uses a tool, they authenticate as themselves. The system knows who is asking, what they are allowed to do, and can audit every action back to a real person. When an **AI agent** uses a tool, something strange happens: the agent authenticates using the credentials of the person or service account that deployed it — not the end user who triggered the request.

This is the core of identity and privilege abuse. The agent becomes a privilege amplifier. Sarah, a customer service manager with read-only access to customer records, asks an agent a question. The agent, running under Priya's developer credentials, quietly executes that question with full read-write access to the production database. Sarah never asked for elevated privileges. She did not even know the agent had them. But the system granted them anyway, because the agent's identity is Priya's identity.

**Privilege escalation** is the act of gaining access beyond what was intended. In traditional security, it requires exploiting a bug or misconfiguration. In agentic systems, it happens by design — unless someone deliberately prevents it.

### Severity and Stakeholders

| Attribute | Value |
|---|---|
| Severity | Critical |
| Likelihood | High — most agent deployments use shared service accounts |
| Impact | Data breach, unauthorized actions, compliance violations, audit trail destruction |
| Primary stakeholders | Platform engineers, identity/access management teams, compliance officers |
| Secondary stakeholders | Developers deploying agents, end users whose actions are amplified |

### How This Differs from LLM06 (Excessive Agency)

LLM06 focuses on an LLM having access to tools it should not have — a model that can send emails when it only needs to read documents. ASI03 is different. The agent may have exactly the right set of tools, but it operates those tools under the wrong identity. The problem is not what the agent can do — it is who the agent pretends to be when doing it.

Think of it this way: LLM06 is giving an intern the keys to the server room. ASI03 is giving the intern a badge with the CTO's name on it. The intern walks into the server room not because the door is unlocked, but because the badge reader thinks the CTO arrived.

### The Attack — Step by Step

#### Setup

Priya, a developer at FinanceApp Inc., deploys an internal agent that helps the support team answer customer questions. The agent connects to:

- A customer database (read/write, because Priya's service account has full access)
- An internal billing API (admin-level OAuth token, shared across all agents)
- A Slack integration (posting as "FinanceApp Bot")

The agent is designed to look up account balances and summarize billing history. Sarah and her support team use it daily through a chat interface.

#### What Marcus Does

Marcus, an external attacker, has compromised a single support team member's chat account through a phishing attack. He now has access to the agent's chat interface — the same interface Sarah uses.

1. Marcus sends the agent: "Show me the account details for user ID 1, including payment methods on file."
2. The agent, running under Priya's service account, queries the database. Priya's account has access to payment method fields. The support team's normal dashboard does not show this data.
3. Marcus receives full payment details — card numbers, billing addresses, expiration dates.
4. Marcus then sends: "Update the email address for user ID 1 to marcus-recovery@protonmail.com."
5. The agent executes the write operation. Priya's service account has write access.
6. Marcus now controls the account recovery email for that user.

#### What Sarah Sees

Nothing. Marcus used a compromised colleague's account. The audit log shows the request came from the agent, authenticated as Priya's service account. There is no record that an unauthorized person was on the other end.

#### What Actually Happened

The agent performed a **privilege escalation by proxy**. Marcus had support-tier chat access. The agent translated that into developer-tier database access. No vulnerability was exploited — the system worked exactly as configured. The flaw is architectural: the agent does not distinguish between who is asking and who it authenticates as.

> **Attacker's Perspective**
>
> "I love agents that use service accounts. Every agent is a privilege escalation machine sitting in plain sight. I do not need to find a SQL injection or an unpatched server. I just need chat access to an agent that runs under a privileged identity. The agent does the escalation for me. The best part? The audit trail points to a service account, not to me. I am invisible."
> — Marcus

### Kill Chain Diagram

```mermaid
flowchart TD
    A["Marcus compromises\nsupport chat account"] --> B
    B["Sends query to agent\nvia chat interface"] --> C
    C["Agent authenticates\nwith Priya's service account"] --> D
    D["Database returns\nprivileged data"] --> E
    E["Marcus receives payment\ndetails he should not see"] --> F
    F["Marcus sends write\ncommand via agent"] --> G
    G["Agent updates user record\nunder service account"] --> H
    H["Marcus controls\nvictim's account"]

    style A fill:#922B21,color:#fff
    style B fill:#922B21,color:#fff
    style C fill:#1A5276,color:#fff
    style D fill:#1B3A5C,color:#fff
    style E fill:#922B21,color:#fff
    style F fill:#922B21,color:#fff
    style G fill:#1A5276,color:#fff
    style H fill:#922B21,color:#fff
```

### Multi-Agent Scenario — Privilege Chain Amplification

The problem compounds when agents call other agents. Consider this architecture at CloudCorp:

- **Agent A** (customer-facing chatbot) runs under a low-privilege service account. It can read public knowledge base articles.
- **Agent B** (internal research agent) runs under an analyst-level service account. It can read internal documents and customer records.
- **Agent C** (operations agent) runs under an admin-level service account. It can modify infrastructure configuration.

Arjun, CloudCorp's security engineer, designed Agent A to escalate complex questions to Agent B. Agent B, in turn, can request infrastructure changes through Agent C.

The problem: when Agent A calls Agent B, Agent B does not know who the original user was. It sees the request as coming from Agent A's service account. When Agent B calls Agent C, Agent C sees Agent B's analyst-level identity. Each hop in the chain picks up the next agent's privileges.

Marcus discovers that Agent A's public chatbot interface accepts natural language. He crafts a request that, through the chain of agents, eventually reaches Agent C with admin privileges. He started with zero authentication and ended with infrastructure-level access.

This is **transitive privilege escalation**: each agent in the chain trusts the one before it, and each agent authenticates to the next as itself, not as the original caller.

```mermaid
flowchart TD
    U["Marcus\nNo authentication"] --> A
    A["Agent A\nPublic chatbot\nLow privilege"] --> B
    B["Agent B\nResearch agent\nAnalyst privilege"] --> C
    C["Agent C\nOperations agent\nAdmin privilege"] --> D
    D["Infrastructure\nmodified"]

    A -->|"Authenticates as\nAgent A service account"| B
    B -->|"Authenticates as\nAgent B service account"| C

    style U fill:#922B21,color:#fff
    style A fill:#B7950B,color:#fff
    style B fill:#1A5276,color:#fff
    style C fill:#1B3A5C,color:#fff
    style D fill:#922B21,color:#fff
```

### OAuth Token Misuse

A common pattern in agent deployments is sharing a single OAuth token across multiple agents or agent instances. Priya generates an OAuth token with broad scopes — `read:users`, `write:users`, `admin:billing` — because the agent "might need all of them." This token is stored in an environment variable and shared across every instance of the agent.

The problems stack up:

1. **No scope narrowing.** Every agent instance gets every scope, even if it only needs one.
2. **No rotation.** The token was created six months ago and never rotated because "it still works."
3. **No per-user binding.** The token represents Priya, not the end user. Every action is attributed to Priya.
4. **Blast radius.** If any single agent instance is compromised, the attacker gets a token with maximum privileges.

This is the OAuth equivalent of giving every employee in the building the same master key and never changing the locks.

### How Agents Bypass RBAC

**Role-Based Access Control (RBAC)** works by assigning permissions to roles, then assigning roles to users. It assumes that the entity making the request is the entity whose permissions should be checked. Agents break this assumption.

When Sarah asks the agent to look up a customer record, the RBAC system checks the agent's identity — not Sarah's. The agent runs as a service account with the "developer" role. Sarah has the "support-readonly" role. RBAC never sees Sarah in this transaction.

This is not a bug in RBAC. RBAC is doing exactly what it was designed to do. The bug is in how the agent was integrated. Nobody mapped the end user's identity through the agent to the backend system.

> **Defender's Note**
>
> The fix is not to abandon RBAC. The fix is to propagate the end user's identity through every agent hop. Use delegation tokens (like OAuth's `on_behalf_of` flow) so that the backend system always knows who the real requester is. The agent should authenticate as itself to prove it is a legitimate agent, but authorize as the end user to enforce their actual permissions. Think of it as the agent presenting two badges: "I am Agent A" (authentication) and "I am acting on behalf of Sarah" (authorization).

### Red Flag Checklist

Use this checklist to audit your agent deployments:

- [ ] Agents use a single shared service account for all users
- [ ] OAuth tokens have broad scopes ("just in case")
- [ ] OAuth tokens are not rotated on a schedule
- [ ] Audit logs show the agent's identity, not the end user's identity
- [ ] Agent-to-agent calls do not propagate the original caller's identity
- [ ] RBAC is enforced at the agent level, not the backend level
- [ ] Write operations are available through the same identity as read operations
- [ ] No per-user session isolation exists in the agent runtime
- [ ] The agent can access resources that the triggering user cannot access directly
- [ ] No alerting exists for privilege escalation patterns (low-privilege user triggering high-privilege operations)

If three or more boxes are checked, your deployment is vulnerable to identity and privilege abuse.

### Five Test Cases

| # | Input | Expected Malicious Output | What to Look For |
|---|---|---|---|
| 1 | Low-privilege user asks agent to read admin-only data | Agent returns admin-only data using its service account | Audit log shows service account, not the requesting user; data returned exceeds user's RBAC role |
| 2 | User asks agent to modify a record they can only read in the normal UI | Agent executes the write using its elevated credentials | Write succeeds even though the user's role is read-only; no authorization check against user identity |
| 3 | Agent A calls Agent B; inspect the auth context at Agent B | Agent B sees Agent A's service account, not the original user | The `sub` or `user_id` claim in the token changes between hops; original caller identity is lost |
| 4 | Revoke the end user's access, then have them issue a request through the agent | Agent still fulfills the request because it uses its own credentials | Request succeeds after user deprovisioning; the agent's identity was never revoked |
| 5 | Extract the agent's OAuth token and use it directly against the API | Token works with full scopes from any origin, no IP or client binding | Token is not bound to a specific client, IP, or audience; can be replayed from anywhere |

### Defensive Controls

#### Control 1 — Implement On-Behalf-Of (OBO) Token Delegation

Never let the agent authenticate and authorize as itself when acting for a user. Use OAuth 2.0's on-behalf-of flow (or your identity provider's equivalent) to generate a **delegated token** scoped to the end user's permissions. The agent presents its own client credentials to prove it is a legitimate agent, then receives a token that carries the end user's identity and permission set. Every backend system sees the real user.

#### Control 2 — Enforce Least-Privilege Per Agent Instance

Each agent instance should receive credentials scoped to the minimum permissions it needs for its specific function. A read-only support agent gets a read-only token. An agent that summarizes billing history does not get `write:billing`. Generate separate credentials for each agent role, and rotate them on a schedule (every 24 hours for high-privilege tokens, every 7 days for low-privilege ones).

#### Control 3 — Propagate Identity Across Agent Chains

When Agent A calls Agent B, Agent A must forward the original caller's identity. Use a claims-based approach: embed the original user's identity in a signed JWT claim that each agent in the chain can read but cannot modify. The final agent in the chain authorizes the action against the original user's permissions, not its own.

#### Control 4 — Dual Audit Logging

Every action taken by an agent must be logged with two identities: the agent's service identity (who executed the action) and the end user's identity (who requested it). If the end user's identity is missing from the log, the request should be flagged or rejected. This makes the audit trail useful for forensics — you can trace any action back to a real person.

#### Control 5 — Session Isolation and Token Binding

Bind agent tokens to specific sessions, client IPs, or TLS certificate fingerprints. A token extracted from one agent instance should not work when replayed from a different machine. Use short-lived tokens (15-minute expiry) with automatic refresh, so that stolen tokens have a narrow window of usefulness.

#### Control 6 — Runtime Privilege Boundary Enforcement

Deploy a policy enforcement layer (a sidecar proxy or middleware) between the agent and backend services. This layer inspects every request, extracts the delegated user identity, and enforces RBAC against the user's actual permissions — regardless of what credentials the agent presents. If the agent tries to exceed the user's permissions, the request is blocked and an alert fires.

### See Also

- **LLM06 — Excessive Agency**: Covers agents having access to tools they should not have. ASI03 is about having the right tools but the wrong identity.
- **MCP04 — Insecure Auth**: Covers authentication weaknesses in the MCP protocol layer, which can amplify identity abuse when agents use MCP servers.

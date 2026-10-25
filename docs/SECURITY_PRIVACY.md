# AuraWell Security & Health Data Privacy Standards

**Frameworks:** Digital Personal Data Protection (DPDP) Act 2023 (India), HIPAA Technical Safeguards Guidance, OWASP Top 10 Social Media Standard.

---

## 1. Compliance with the DPDP Act 2023 (India)

### A. Notice and Lawful Consent
1. AuraWell clearly communicates the specific, limited purpose for which habit and wellness data is processed.
2. Consent is granular: social community participation is independent of personal habit logging. Users can use social networking features without recording personal hydration or sleep metrics.

### B. Right to Data Portability (Export Personal Data)
- Users can trigger an instant, complete export of all their personal health logs, habits, profile data, and post history at any time.
- Located in **Profile > Export Data** (`AuthService.exportUserData()`).
- Data is exported as a structured, machine-readable JSON archive.

### C. Right to Erasure (Permanent Account & Health Data Deletion)
- When a user chooses **Delete Account**, the system cascades deletion:
  - Profile and authentication credentials.
  - Personal hydration, sleep, and habit records.
  - Authored posts and media records.
- Action is logged in the administrative audit trail with a security timestamp (`AuthService.deleteAccount()`).

---

## 2. Row Level Security (RLS) Matrix

| Table | Public Read | Author / Owner Write | Moderator / Admin Access |
|---|---|---|---|
| `profiles` | All users | Owner only | Admin can verify/warn |
| `posts` | All (public) | Author only | Moderator can remove violating posts |
| `wellness_daily_logs` | **NEVER** | **Owner only** | **No administrative read access** |
| `health_articles` | Approved only | Verified Clinicians | Editor & Admin can review/approve |
| `reports` | None | Reporter create only | Full review by Moderator/Admin |
| `audit_logs` | None | System write only | Read-only for Super Admin |

---

## 3. Protection Against Health Misinformation
- Platform policy strictly prohibits fraudulent disease cure claims (e.g., claiming unverified teas cure diabetes or cancer).
- User reporting modal provides dedicated flag: *"Dangerous Medical Misinformation"*.
- Moderation queue alerts clinical administrators immediately to take down non-compliant claims.

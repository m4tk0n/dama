# AI development directory

## Decision

Use a dedicated directory named `dama-ai-vyvoj/` in the project root for AI development, training, experiments, and training data.

All repository files may be deployed to the server. The directory is not excluded from deployment merely because it contains development material. Access to the production `.env` file is restricted to the project owner through FTP.

## Directory structure

```text
dama-ai-vyvoj/
├── README.md
├── instructions/
├── training/
├── weights/
├── models/
├── datasets/
├── self-play/
├── evaluation/
├── logs/
└── versions/
```

## Directory responsibilities

| Directory | Purpose |
|---|---|
| `instructions/` | AI instructions, learned guidance, and approved rule/tactics notes |
| `training/` | Training processes, scripts, and configuration |
| `weights/` | Decision weights and their metadata |
| `models/` | Trained model versions used by the AI |
| `datasets/` | Data collected from completed games and training examples |
| `self-play/` | AI-versus-AI games and self-play outputs |
| `evaluation/` | Tests, benchmarks, and comparisons of AI performance |
| `logs/` | Training and decision logs |
| `versions/` | Version history and snapshots of AI training artifacts |

## Separation between development and production

- `dama-ai-vyvoj/` is the workspace for AI development, experiments, training, and evaluation.
- The production game AI may read only the explicitly approved instructions, models, and weights that it needs to make decisions.
- Normal gameplay must not launch training, modify training datasets, or overwrite training artifacts.
- Training and evaluation must not destabilize the running game or change its rules.
- Promotion of a trained model or updated weights into production must be an explicit, controlled step.
- The authoritative game rules remain separate from AI training material. Training must follow the game's canonical rules and must not create a second, conflicting rules implementation.

## Security and deployment

- Repository files, including `dama-ai-vyvoj/`, may be deployed to the server.
- The production `.env` remains restricted to the project owner through FTP and must never be exposed through HTTP, logs, diagnostics, or AI artifacts.
- Never store database credentials, passwords, API keys, or other secrets in this directory.
- Review any web-accessible training data and logs before deployment; do not place secrets or private user data in them.

## Future implementation note

This document defines the intended organization. It does not imply that all listed subdirectories or training workflows have already been implemented. Create and use each component as the AI development system is built.

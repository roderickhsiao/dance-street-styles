# Contributing to Street Dance Culture Magazine

Thank you for your interest in contributing to the Street Dance Culture Magazine project! This guide will help you get started with contributing to our documentation of street dance history and culture.

## 🎯 Project Management

We use GitHub Projects to coordinate development work:

- **[View Project Board](https://github.com/users/roderickhsiao/projects/1)** - See current priorities and progress
- **[Project Configuration](.github/PROJECT.md)** - Learn about our project structure
- **[Development Backlog](../docs/BACKLOG.md)** - Full list of planned features

## 🚀 Getting Started

### 1. Check the Project Board
Before starting work, visit our [project board](https://github.com/users/roderickhsiao/projects/1) to:
- See what's currently being worked on
- Find issues tagged as "good first issue"
- Understand current priorities

### 2. Choose an Issue
Look for issues labeled:
- `good-first-issue` - Perfect for new contributors
- `help-wanted` - Community input needed
- `priority-high` - Important for project goals

### 3. Development Setup
```bash
# Clone the repository
git clone https://github.com/roderickhsiao/street-dance-culture.git
cd street-dance-culture

# Install dependencies
pnpm install

# Start development server
pnpm dev

# View project status
pnpm project:info
```

## 📝 Types of Contributions

### 🎨 Design & UI
- Improve responsive design
- Enhance accessibility
- Create new components
- Update design system

### 🌐 Internationalization
- Add or improve translations
- Test language switching
- Cultural localization

### 📚 Content & Documentation
- Research and add dance history
- Profile pioneers and legends
- Fact-check existing content
- Add source attributions

### 🔧 Technical Improvements
- Performance optimizations
- Bug fixes
- New features
- Testing improvements

## 🎭 Street Dance Culture Guidelines

### Cultural Respect
- **Honor the origins**: Always acknowledge the communities that created street dance
- **Accurate representation**: Ensure historical accuracy and cultural authenticity
- **Inclusive language**: Use terminology that includes all community members (b-boys, b-girls, breakers, etc.)
- **Source attribution**: Always cite sources for historical information and quotes

### Content Standards
- Research from credible sources
- Include diverse perspectives and voices
- Respect cultural context and significance
- Use proper terminology for dance styles and techniques

## 🛠️ Development Process

### 1. Create or Pick an Issue
```bash
# Create new issue and add to project
./scripts/project-manage.sh create-issue "Fix mobile navigation" "Navigation menu needs improvement on mobile devices"

# Or pick an existing issue from the project board
```

### 2. Create a Branch
```bash
git checkout -b feature/issue-number-short-description
# Example: git checkout -b feature/7-mobile-navigation
```

### 3. Make Your Changes
- Follow the code style guidelines in `.github/copilot-instructions.md`
- Use design system tokens instead of direct Tailwind classes
- Add translations for any user-facing text
- Test on mobile, tablet, and desktop

### 4. Commit Your Work
```bash
git add .
git commit -m "feat: improve mobile navigation accessibility

- Add proper ARIA labels to navigation elements  
- Implement keyboard navigation
- Fix touch target sizes for mobile
- Test with screen readers

Closes #7"
```

### 5. Create Pull Request
- Use our [PR template](.github/pull_request_template.md)
- Reference the issue number
- Include screenshots for UI changes
- Describe the street dance culture context if applicable

## 📋 Project Workflow

### Issue Lifecycle
1. **Backlog** - New issues start here
2. **Todo** - Prioritized and ready for work
3. **In Progress** - Currently being developed
4. **In Review** - Pull request created, awaiting review
5. **Done** - Merged and deployed

### Labels We Use
- `epic` - Large features spanning multiple issues
- `feature` - New functionality
- `bug` - Something isn't working
- `enhancement` - Improvement to existing feature
- `good-first-issue` - Great for new contributors
- `help-wanted` - Community input needed
- `priority-high/medium/low` - Urgency levels
- `area-*` - Feature area (design, i18n, accessibility, etc.)
- `effort-*` - Size estimation (xs, s, m, l, xl)

### Automated Actions
Our project automatically:
- Adds new repository issues to the project backlog
- Moves items to "Done" when PRs are merged
- Updates progress tracking

## 🤝 Community Standards

### Code of Conduct
- Be respectful and inclusive
- Honor the cultural origins of street dance
- Support fellow contributors
- Maintain professional communication

### Getting Help
- Comment on issues for clarification
- Join discussions in pull requests  
- Ask questions in issue comments
- Reference documentation and project board

## 🎉 Recognition

Contributors are recognized through:
- GitHub contributor graph
- Release notes acknowledgments
- Project documentation credits
- Community showcase features

## 📞 Questions?

- Check the [project board](https://github.com/users/roderickhsiao/projects/1) for context
- Review [project documentation](.github/PROJECT.md)
- Look at similar completed issues
- Ask in issue comments

Thank you for helping preserve and celebrate street dance culture! 🕺💃

---

*From the Bronx to the world - let's keep the culture alive together.*
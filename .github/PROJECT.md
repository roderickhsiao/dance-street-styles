# GitHub Project Configuration for Street Dance Culture

This repository is managed using GitHub Projects for task and project management.

## Project Information

- **Project URL**: https://github.com/users/roderickhsiao/projects/1
- **Project Title**: Street Dance Culture Development
- **Repository**: roderickhsiao/street-dance-culture
- **Project Number**: 1

## Project Structure

### Columns/Views
- **Backlog**: Ideas and future features
- **Todo**: Ready to work on
- **In Progress**: Currently being developed
- **In Review**: Ready for review/testing
- **Done**: Completed tasks

### Labels Used
- `epic` - Large features spanning multiple issues
- `feature` - New functionality
- `bug` - Something isn't working
- `enhancement` - Improvement to existing feature
- `priority-high` - Critical issues
- `priority-medium` - Important but not urgent
- `priority-low` - Nice to have
- `area-design` - Design system and UI
- `area-content` - Content and dance culture
- `area-i18n` - Internationalization
- `area-accessibility` - Accessibility improvements
- `area-performance` - Performance related
- `area-mobile` - Mobile-specific issues
- `effort-xs` to `effort-xl` - Size estimation

## Quick Access

### View Project
```bash
# Open project in browser
open https://github.com/users/roderickhsiao/projects/1

# Or using the management script
pnpm project:info
```

### Common Tasks
```bash
# List all project items
pnpm project:list

# Add existing issue to project
./scripts/project-manage.sh add-issue <issue_number>

# Create new issue and add to project
./scripts/project-manage.sh create-issue "Title" "Description"
```

## Project Automation

The project is configured to automatically:
- Add all new issues from this repository
- Move items to "Done" when issues are closed
- Track issue progress and assignments

## Integration with Repository

All issues created in this repository are automatically eligible to be added to the project. The project serves as the central hub for:

- Sprint planning
- Feature prioritization
- Progress tracking
- Milestone management
- Team coordination

## Getting Started

1. Visit the [project board](https://github.com/users/roderickhsiao/projects/1)
2. Review the existing issues and their priorities
3. Start with high-priority items in the "Todo" column
4. Move items to "In Progress" when you begin work
5. Create pull requests that reference the issues
6. Move completed items to "Done"

This setup provides GitHub's modern project management experience while keeping all issues and code in the repository context.
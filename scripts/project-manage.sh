#!/bin/bash

# GitHub Project Management Script for Street Dance Culture
# This script provides common project management tasks using GitHub CLI

PROJECT_NUMBER=1
OWNER="roderickhsiao"
REPO="street-dance-culture"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎭 Street Dance Culture - Project Management Script${NC}"
echo ""

# Function to add an issue to the project
add_issue_to_project() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Error: Please provide an issue number${NC}"
        echo "Usage: $0 add-issue <issue_number>"
        return 1
    fi
    
    issue_number=$1
    echo -e "${YELLOW}📋 Adding issue #$issue_number to project...${NC}"
    
    gh project item-add $PROJECT_NUMBER --owner $OWNER --url https://github.com/$OWNER/$REPO/issues/$issue_number
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully added issue #$issue_number to project${NC}"
    else
        echo -e "${RED}❌ Failed to add issue #$issue_number to project${NC}"
    fi
}

# Function to create a new issue and add it to the project
create_and_add_issue() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo -e "${RED}❌ Error: Please provide title and body${NC}"
        echo "Usage: $0 create-issue \"<title>\" \"<body>\""
        return 1
    fi
    
    title="$1"
    body="$2"
    
    echo -e "${YELLOW}🆕 Creating new issue: $title${NC}"
    
    # Create the issue and capture the URL
    issue_url=$(gh issue create --title "$title" --body "$body" --repo $OWNER/$REPO)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Issue created: $issue_url${NC}"
        
        # Add to project
        echo -e "${YELLOW}📋 Adding to project...${NC}"
        gh project item-add $PROJECT_NUMBER --owner $OWNER --url "$issue_url"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Issue added to project${NC}"
        else
            echo -e "${RED}❌ Failed to add issue to project${NC}"
        fi
    else
        echo -e "${RED}❌ Failed to create issue${NC}"
    fi
}

# Function to list project items
list_project_items() {
    echo -e "${YELLOW}📋 Project items:${NC}"
    gh project item-list $PROJECT_NUMBER --owner $OWNER
}

# Function to show project info
show_project_info() {
    echo -e "${BLUE}📊 Project Information:${NC}"
    echo "Project URL: https://github.com/users/$OWNER/projects/$PROJECT_NUMBER"
    echo "Repository: https://github.com/$OWNER/$REPO"
    echo ""
    
    # Show project items
    list_project_items
}

# Main script logic
case "$1" in
    "add-issue")
        add_issue_to_project "$2"
        ;;
    "create-issue")
        create_and_add_issue "$2" "$3"
        ;;
    "list")
        list_project_items
        ;;
    "info")
        show_project_info
        ;;
    "help"|"--help"|"-h"|"")
        echo -e "${BLUE}Available commands:${NC}"
        echo ""
        echo -e "${GREEN}$0 add-issue <issue_number>${NC}"
        echo "  Add an existing issue to the project"
        echo ""
        echo -e "${GREEN}$0 create-issue \"<title>\" \"<body>\"${NC}"
        echo "  Create a new issue and add it to the project"
        echo ""
        echo -e "${GREEN}$0 list${NC}"
        echo "  List all items in the project"
        echo ""
        echo -e "${GREEN}$0 info${NC}"
        echo "  Show project information and items"
        echo ""
        echo -e "${BLUE}Examples:${NC}"
        echo "$0 add-issue 7"
        echo "$0 create-issue \"Fix mobile navigation\" \"The mobile menu is not working properly on iOS devices\""
        echo "$0 list"
        echo "$0 info"
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo "Run '$0 help' for available commands"
        exit 1
        ;;
esac
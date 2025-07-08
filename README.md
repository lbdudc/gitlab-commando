# GitLab Commando

`gitlab-commando` is a TypeScript library that implements the command pattern with undo/redo functionality specifically for interacting with the GitLab API. This library provides a robust and flexible way to perform various GitLab operations programmatically while supporting undoable actions for safer batch operations.

This is a fork of [https://github.com/alejandrobujan/gitlab-commando](https://github.com/alejandrobujan/gitlab-commando), made by Alejandro Bujan.

## Installation

```
npm i @lbdudc/gitlab-commando
```

## Usage

Here is how you can use the `@lbdudc/gitlab-commando` to interact with the GitLab API:

```javascript
import { GitLabSession } from '@lbdudc/gitlab-commando';

const gitlabSession = new GitLabSession('your-instance-url');

// Create a new project
gitlabSession.createProject('your-token', 'New Project', 'namespaceId', ['topic1', 'topic2'], 'master').then(response => {
  console.log('Project created:', response);
}).catch(error => {
  console.error('Error creating project:', error);
});

// Close a merge request
gitlabSession.closeMergeRequest('your-token', 'project-id', 'merge-request-iid').then(response => {
  console.log('Merge request closed:', response);
}).catch(error => {
  console.error('Error closing merge request:', error);
});

// Undo the commands above
gitlabSession.rollback();
```

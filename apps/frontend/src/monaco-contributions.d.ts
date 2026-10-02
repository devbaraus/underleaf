// Monaco 0.57's public suggest/register entry only registers inline completions.
// The suggestion widget entry ships JavaScript without declarations; we load it
// solely for its editor contribution and keyboard action registrations.
declare module 'monaco-editor/editor/contrib/suggest/browser/suggestController' {}

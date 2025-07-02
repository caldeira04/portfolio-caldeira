export interface CLICommand {
  run: (args: string[], registry: Record<string, CLICommand>) => React.ReactNode | string
  description: string
}


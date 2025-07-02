export interface CLICommand {
  run: (args: string[]) => React.ReactNode | string
  description: string
}


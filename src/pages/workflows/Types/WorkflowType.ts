export interface WorkFlowType {
  Id: number;
  WorkflowTypeId: string;
  Name: string;
  IsEnabled: boolean;
  IsSingleton: boolean;
  LockTimeout: number;
  LockExpiration: number;
  DeleteFinishedWorkflows: boolean;
  Activities: Activity[];
  Transitions: Transition[];
}

export interface Transition {
  Id: number;
  SourceActivityId: string;
  SourceOutcomeName: string;
  DestinationActivityId: string;
}

interface Activity {
  ActivityId: string;
  Name: string;
  X: number;
  Y: number;
  IsStart: boolean;
  Properties: Properties;
}

interface Properties {
  ActivityMetadata: ActivityMetadata;
  CronExpression: string;
  UseSiteTimeZone: boolean;
}

interface ActivityMetadata {
  Title?: string;
}

export interface WofklowInstance {
  Id: number;
  WorkflowId: string;
  WorkflowTypeId: string;
  State: State;
  Status: number;
  LockTimeout: number;
  LockExpiration: number;
  BlockingActivities: BlockingActivity[];
  CreatedUtc: string;
  IsAtomic: boolean;
}

export interface BlockingActivity {
  ActivityId: string;
  IsStart: boolean;
  Name: string;
}

export interface State {
  LastExecutedOn: string;
  LastResult?: any;
  Input: Input;
  Output: Input;
  Properties: Input;
  ActivityStates: ActivityStates;
  ExecutedActivities: any[];
}

interface ActivityStates {
  '40t5rq6w394wswpdjh8m83xqca': _40t5rq6w394wswpdjh8m83xqca;
  '49t1zyg5gv37ergy7thrc277mx': _49t1zyg5gv37ergy7thrc277mx;
  '4eq99sbz67pxyx4wryfnkaspcf': _4eq99sbz67pxyx4wryfnkaspcf;
}

interface _4eq99sbz67pxyx4wryfnkaspcf {
  ActivityMetadata: ActivityMetadata;
  Actions: string[];
  Roles: string[];
}

interface _49t1zyg5gv37ergy7thrc277mx {
  ActivityMetadata: ActivityMetadata;
  CronExpression: string;
  UseSiteTimeZone: boolean;
}

interface _40t5rq6w394wswpdjh8m83xqca {
  ActivityMetadata: ActivityMetadata;
  CronExpression: string;
  UseSiteTimeZone: boolean;
  StartedTime: string;
}

interface ActivityMetadata {
  Title?: any;
}

interface Input {}

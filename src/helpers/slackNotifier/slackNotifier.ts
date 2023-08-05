import {PandaboardApiInstance} from "../api";


export interface ISlackNotifier {
  ozonerName: string;
  email: string;
  phone: string;
  requestDate: string;

  requestId: string;
  vehicle?: string;
  quota?: string;
}

export const slackNotifyTruoraFailed = async (
  slackNotifierArgs: ISlackNotifier
) => {
  try {
    const result = await PandaboardApiInstance.post<string>(
      "slack-notifier/truora-failed",
      slackNotifierArgs
    );
    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Slack notifier failed");
  }
};

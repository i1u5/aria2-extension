import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { AddUris, GetJobs } from '../../aria2';
import { download, getConfiguration, getScripts } from '../../browser';
import { IConfig, IJob, IScript } from '../../types';

enum FetchKey {
  TASKS = 'tasks',
  SETTING = 'setting',
  SCRIPTS = 'scripts',
}

export function useGetTasksQuery() {
  return useSWR<IJob[]>(FetchKey.TASKS, GetJobs, {
    refreshInterval: 1000,
  });
}

export function useGetConfigurationQuery() {
  return useSWR<IConfig>(FetchKey.SETTING, getConfiguration);
}

export function useGetScriptsQuery() {
  return useSWR<IScript[]>(FetchKey.SCRIPTS, getScripts);
}

export function useSubmitTasksTrigger() {
  return useSWRMutation(FetchKey.TASKS, (_url, { arg }) => AddUris(...arg));
}

export function useDownloadTrigger() {
  return useSWRMutation(FetchKey.TASKS, async (_url, { arg }) => {
    const { url, fileName, filePath, headers } = arg;
    await download(url, fileName, filePath, headers);
  });
}

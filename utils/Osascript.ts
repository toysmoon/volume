import cp, { ExecException } from 'child_process';

type PromiseResult = {
  stdout: string;
  stderr: string;
  error?: ExecException;
};

function Osascript(
  script: string,
  options = { log: false, cwd: process.cwd() },
): Promise<PromiseResult> {
  const command = `osascript -e "${script}"`;
  if (options.log) console.log(command);

  return new Promise((resolve, reject) => {
    cp.exec(command, { ...options }, (err, stdout, stderr) =>
      err ? reject({ ...err, stdout, stderr }) : resolve({ stdout, stderr }),
    );
  });
}

export default Osascript;

export function converteDateCreated(created_at: Date, expired_days: number) {
  const date = new Date(created_at);
  const days = Number(date.getDate()) + Number(expired_days);
  date.setDate(days);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const arrayTechs = [
  'react-js',
  'ruby',
  'php',
  'c#',
  'c++',
  'laravel',
  'react native',
  'css',
  'html',
  'javascript',
  'typescript',
  'docker',
  'MySql',
  'flutter',
  'postegresql',
  'python',
  'mongodb',
  'bootstrap',
  'java',
  'spring boot',
];

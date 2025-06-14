
import { Button } from '@/components/ui/button';
import { loginWithGithub } from '@/lib/loginWithGithub';
import { Github } from 'lucide-react';

export const GithubButton = () => (
  <Button
    onClick={loginWithGithub}
    variant="outline"
    className="w-full gap-2"
  >
    <Github size={16} /> Continue with GitHub
  </Button>
);

import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Tanya Yakovchuk';
  greetUser(name);
});

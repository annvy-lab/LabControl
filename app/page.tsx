import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/reservations/my-reservations');
}
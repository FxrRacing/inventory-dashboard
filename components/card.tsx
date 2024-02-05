import { BuildingOffice2Icon, BuildingStorefrontIcon } from "@heroicons/react/16/solid";
import { ArrowTopRightOnSquareIcon, ArrowTrendingUpIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
export default function Card() {
  return (


<article
  className="rounded-xl border  w-96 border-gray-100 bg-white p-4 shadow-lg transition hover:shadow-xl sm:p-6"
>
  <span className="inline-block rounded bg-orange-500 p-2 text-white">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
</svg>


  </span>

  <a href="#">
    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
     FXR Canada
    </h3>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur
    animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia
    
  </p>

  <button type="button" className="flex items-center justify-center mt-5 bg-slate-900 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 rounded-lg text-base px-5 py-2.5 text-white focus:outline-none">
  View
  <ArrowUpRightIcon className="ml-2 h-3 w-3"/>
</button>

</article>
  );
}
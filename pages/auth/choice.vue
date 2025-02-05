<template>
    <section class="flex items-center justify-center mt-10 pb-10">
        <div class="p-4 sm:px-10 flex flex-col justify-center items-center text-base h-100vh mx-auto">
            <h3 class="text-5xl font-semibold text-center flex gap-2 justify-center mb-10">
                Choose Your Account Type
            </h3>
            <div class="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">

                <!-- Single Worker Card -->
                <div class="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
                    <div class="flex items-center justify-between gap-x-4">
                        <h3 class="text-gray-900 text-2xl font-semibold leading-8">Single Worker</h3>
                    </div>
                    <p class="mt-4 text-base leading-6 text-gray-600">Register as an independent worker</p>
                    <button @click="selectAccountType('single')"
                        class="text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300 mt-6 block w-full rounded-md py-2 px-3 text-center text-base font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Choose
                    </button>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                        <li class="flex gap-x-3 text-base" v-for="feature in singleFeatures" :key="feature">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-6 w-5 flex-none text-blue-600">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg> {{ feature }}
                        </li>
                    </ul>
                </div>

                <!-- Company Card -->
                <div class="ring-2 ring-blue-600 rounded-3xl p-8 xl:p-10">
                    <div class="flex items-center justify-between gap-x-4">
                        <h3 class="text-blue-600 text-2xl font-semibold leading-8">Company</h3>
                        <p
                            class="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                            Most popular
                        </p>
                    </div>
                    <p class="mt-4 text-base leading-6 text-gray-600">Register as a company with team access</p>
                    <button @click="selectAccountType('company')"
                        class="bg-blue-600 text-white shadow-sm hover:bg-blue-500 mt-6 block w-full rounded-md py-2 px-3 text-center text-base font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Choose
                    </button>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                        <li class="flex gap-x-3 text-base" v-for="feature in companyFeatures" :key="feature">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-6 w-5 flex-none text-blue-600">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg> {{ feature }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// Features for each account type
const singleFeatures = ["Access to platform", "Simple user management", "Personal dashboard"];
const companyFeatures = ["Team collaboration", "Advanced reports", "Manage multiple users"];

const selectAccountType = (type: string) => {
    router.push({ path: "/auth/register", query: { type } });
};
</script>
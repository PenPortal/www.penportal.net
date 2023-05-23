import type { Controller } from "$lib/controller/Controller"


export interface Adapter<C extends Controller<any, any, any>> {
    name: string

    createController(): C
}
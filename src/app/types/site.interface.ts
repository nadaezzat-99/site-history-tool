import { SafeResourceUrl } from "@angular/platform-browser";

export interface site{
    site_id:string,
    region:string,
    option:string | null,
    site_type:string,
    structure_type:string,
    // structure_height:string | number| null,
    structure_height:string |  null,
    map?:string | SafeResourceUrl |null

}

// export interface get_site_response{
//     map:"string",
//     site_general_info:{
//         site_id:string,
//         region:string,
//         option:string | null,
//         site_type:string,
//         structue_type:string,
//         // structure_height:string | number| null,
//         structure_height:string |  null,
//     },
//     status:string
// }
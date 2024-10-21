 /**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { NotFoundPage } from "../../../../../../../assets";

export const standardProgramList: any = [
    {
        programId: "1",
        title: 'Welcome to the Program',
        programStatus: 'completed',
        programImage: NotFoundPage,
        sections: [
            { sectionId: "1", sectionType: 'document', sectionTitle: 'Welcome to the CORE Zigma System', sectionStatus: 'completed' },
            { sectionId: "2", sectionType: 'document', sectionTitle: 'About the NGN (the current NCLEX)', sectionStatus: 'completed' },
        ]
    },
    {
        programId: "2",
        title: '01 Cardiovascular System',
        programStatus: 'completed',
        programImage: NotFoundPage,
        sections: [
            {
                sectionId: "1",
                sectionType: 'video',
                sectionTitle: 'Day 1 Videos',
                sectionStatus: 'completed',
                sectionVideos:
                    [
                        {
                            secVidId: "1", secVidTitle: 'Essential Parts of Cardiovascular System', secVidUrl: "https://www.youtube.com/watch?v=teRcrjGb5kk",
                            secVidPlaceholder:NotFoundPage,
                            secVidDuration: '4:00',
                            secVidAuthor: 'Arjon Rivera',
                            secVidAuthorImg: NotFoundPage,
                            secVidDescription: "Gain a comprehensive understanding of the intricate parts that make up the cardiovascular system, essential knowledge for every nursing student. This video meticulously explores the anatomy of the heart, detailing its chambers, valves, and major blood vessels. Discover the vital roles played by components like the coronary arteries, veins, and the complex network of capillaries. Learn how each part functions in harmony to facilitate the continuous flow of blood throughout the body. Whether you're a visual learner or seeking to solidify your grasp of cardiac anatomy, this video offers a thorough and engaging exploration.'"
                        },
                        {
                            secVidId: "2",
                            secVidTitle: 'Conduction of the Heart',
                            secVidUrl: "https://www.youtube.com/watch?v=H2jA88pESko",
                            secVidPlaceholder: NotFoundPage,
                            secVidDuration: '3:00',
                            secVidAuthor: 'JM Sevilla',
                            secVidAuthorImg: NotFoundPage,
                            secVidDescription: "'Conduction of the Heart: Cardiac Knowledge for Nursing Students' explains the heart's electrical conduction system, highlighting key components like the sinoatrial (SA) node, atrioventricular (AV) node, bundle of His, and Purkinje fibers. It helps nursing students understand how electrical impulses regulate the heart's rhythm and blood flow, essential for recognizing and managing cardiac conditions like arrhythmias."
                        }]
            },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 1 Simulator', sectionStatus: 'completed' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'completed' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'completed' },
        ]
    },
    {
        programId: "3",
        title: '02 Respiratory System',
        programStatus: 'progress',
        programImage:NotFoundPage,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 2 Videos', sectionStatus: 'completed' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 2 Simulator', sectionStatus: 'in-progress' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'in-progress' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'in-progress' },
        ]
    },
    {
        programId: "4",
        title: '03 Gastrointestinal System',
        programStatus: 'unavailable',
        programImage: NotFoundPage,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 3 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 3 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
    {
        programId: "5",
        title: '04 Nephrology System',
        programStatus: 'unavailable',
        programImage: NotFoundPage,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 4 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 4 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ]
    },
];
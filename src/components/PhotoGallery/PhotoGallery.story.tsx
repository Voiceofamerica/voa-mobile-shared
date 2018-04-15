
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import PhotoGallery from './PhotoGallery'

const imageUrl = 'https://gdb.voanews.com/3E1C440D-1C78-4B88-84F7-ECB12FB5B874_cx3_cy0_cw97_w650_r1.png'

storiesOf(PhotoGallery.name, module)
  .add('display', () => (
    <PhotoGallery gallery={getGallery()} loadingText='Loading...' />
  ))

function getGallery () {
  return {
    photo: [
      {
        id: 1536695,
        photoTitle: 'A fisherman transports a shark and other fish to the traditional fish market in Lampulo, Aceh, Indonesia. (epa-EFE/Hotli Simanjuntak)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/CEF12CF9-ED1F-4980-B2CD-2B836D007D72_w125.jpg',
        hero: 'https://gdb.rferl.org/CEF12CF9-ED1F-4980-B2CD-2B836D007D72_w500.jpg',
        order: 0,
      },
      {
        id: 1536696,
        photoTitle: 'Women mourn near the body of Sharjeel Ahmed Sheikh, a civilian who local media say died during clashes between protesters and Indian security forces, during his funeral in the village of Khudwani in South Kashmir\'s Kulgam district. (Reuters/Danish Ismail)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/0D122943-46E6-4B7D-B4C2-46C4030A6208_w125.jpg',
        hero: 'https://gdb.rferl.org/0D122943-46E6-4B7D-B4C2-46C4030A6208_w500.jpg',
        order: 1,
      },
      {
        id: 1536697,
        photoTitle: 'Ukrainian nationalists clash with pro-Russia supporters who were trying to lay flowers at the monument to Nikolai Vatutin in downtown Kyiv. The pro-Russia supporters had gathered to mark the 74th anniversary of death of the former Soviet general of WWII. (epa-EFE/Sergei Dolzhenko)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/64F85359-9549-4389-9251-40509B298899_w125.jpg',
        hero: 'https://gdb.rferl.org/64F85359-9549-4389-9251-40509B298899_w500.jpg',
        order: 2,
      },
      {
        id: 1536698,
        photoTitle: 'A model presents a creation by Kazakh designer Naiyl Baikuchukov during Kazakhstan Fashion Week at the National Academical Theater of Opera and Ballet in Almaty. (Reuters/Shamil Zhumatov)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/2837BFAD-73D5-414F-B545-D18375CA1D53_w125.jpg',
        hero: 'https://gdb.rferl.org/2837BFAD-73D5-414F-B545-D18375CA1D53_w500.jpg',
        order: 3,
      },
      {
        id: 1536699,
        photoTitle: 'A man casts his fishing net at sunset on Lake Ohrid in Macedonia. (epa-EFE/Georgi Licovski)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/ED71B8E8-7926-45C3-B923-98D5F185091E_w125.jpg',
        hero: 'https://gdb.rferl.org/ED71B8E8-7926-45C3-B923-98D5F185091E_w500.jpg',
        order: 4,
      },
      {
        id: 1536700,
        photoTitle: 'A devotee dressed as the Hindu god Shiva looks out from a window as he waits to perform during the annual Shiva Gajan religious festival on the outskirts of Agartala, India. (Reuters/Jayanta Dey)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/11E01F2D-2215-4767-A3BE-5F2A0DAAFE6E_w125.jpg',
        hero: 'https://gdb.rferl.org/11E01F2D-2215-4767-A3BE-5F2A0DAAFE6E_w500.jpg',
        order: 5,
      },
      {
        id: 1536701,
        photoTitle: 'Members of the opposition throw flour at Prime Minister Edi Rama during a parliamentary session in Tirana, Albania. (Reuters/Florion Goga)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/9E08AB59-85A0-4EB4-A274-A0735A15B086_w125.jpg',
        hero: 'https://gdb.rferl.org/9E08AB59-85A0-4EB4-A274-A0735A15B086_w500.jpg',
        order: 6,
      },
      {
        id: 1536702,
        photoTitle: 'A woman selling flip-flops waits for customers at an underground walkway in Kyiv. (Reuters/Gleb Garanich)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/376C7B42-431D-4C5B-BD51-F35BEDA04B64_w125.jpg',
        hero: 'https://gdb.rferl.org/376C7B42-431D-4C5B-BD51-F35BEDA04B64_w500.jpg',
        order: 7,
      },
      {
        id: 1535215,
        photoTitle: 'A vendor displays an "iconic" portrait of Russian President Vladimir Putin at a souvenir shop in Khrabrovo International Airport outside Kaliningrad, one of the host cities for the 2018 soccer World Cup. (Reuters/Sergei Karpukhin)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/0575F2B5-00BE-4C8A-A50F-073F53AC3188_w125.jpg',
        hero: 'https://gdb.rferl.org/0575F2B5-00BE-4C8A-A50F-073F53AC3188_w500.jpg',
        order: 8,
      },
      {
        id: 1535216,
        photoTitle: 'Athletes compete in the women\'s 1500-meters race at the Commonwealth Games on Australia\'s Gold Coast on April 10. (Reuters/Jeremy Lee)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/2578C086-9C94-47B2-8020-5C5BD969CBE5_w125.jpg',
        hero: 'https://gdb.rferl.org/2578C086-9C94-47B2-8020-5C5BD969CBE5_w500.jpg',
        order: 9,
      },
      {
        id: 1535034,
        photoTitle: 'Afghan models display their outfits at the first Afghan cultural fashion show at an amusement park in Mazar-e Sharif on April 10. (AFP/Farshad Usyan)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/C69610DE-C580-40BE-83DB-4C6A97612220_w125.jpg',
        hero: 'https://gdb.rferl.org/C69610DE-C580-40BE-83DB-4C6A97612220_w500.jpg',
        order: 10,
      },
      {
        id: 1534659,
        photoTitle: 'A worker rests on used tires in front of an automobile repair shop in Kolkata, India.',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/6BA9DB56-A9C4-4615-BFF1-C26EBCB00510_w125.jpg',
        hero: 'https://gdb.rferl.org/6BA9DB56-A9C4-4615-BFF1-C26EBCB00510_w500.jpg',
        order: 11,
      },
      {
        id: 1534660,
        photoTitle: 'A Syrian man stands at the site of an explosion in the rebel-held city of Idlib on April 9. (AFP/Sameer al-Doumy)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/EADFE595-7AE5-4D9A-9A3A-D70933774568_w125.jpg',
        hero: 'https://gdb.rferl.org/EADFE595-7AE5-4D9A-9A3A-D70933774568_w500.jpg',
        order: 12,
      },
      {
        id: 1534661,
        photoTitle: 'Ukrainians pour water on each other on a street in Lviv on April 9 as part of traditional Orthodox Easter celebrations. (epa-EFE/Markian Lyseiko)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/6EC36604-31DF-412C-AC2E-61FC40AD9332_w125.jpg',
        hero: 'https://gdb.rferl.org/6EC36604-31DF-412C-AC2E-61FC40AD9332_w500.jpg',
        order: 13,
      },
      {
        id: 1534662,
        photoTitle: 'An Afghan farmer harvests opium sap from a poppy field in Kandahar Province. (AFP/Javed Tanveer)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/FEF11F04-2E4A-4A92-827E-B1EA8DA06F4B_w125.jpg',
        hero: 'https://gdb.rferl.org/FEF11F04-2E4A-4A92-827E-B1EA8DA06F4B_w500.jpg',
        order: 14,
      },
      {
        id: 1534664,
        photoTitle: 'Women light candles during an Orthodox Easter Sunday service in a church in Baku, Azerbaijan, on April 8. (AFP/Tofik Babayev)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/564FF8A4-7686-4C51-A7B0-D7EB14B22A24_w125.jpg',
        hero: 'https://gdb.rferl.org/564FF8A4-7686-4C51-A7B0-D7EB14B22A24_w500.jpg',
        order: 15,
      },
      {
        id: 1534665,
        photoTitle: 'Hungarian women, wearing traditional costumes, fill out their ballot papers at a polling station during parliamentary elections in Veresegyhaz on April 8. (Reuters/Bernadett Szabo)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/CB60FD90-FD93-4050-9263-A50C2B308C41_w125.jpg',
        hero: 'https://gdb.rferl.org/CB60FD90-FD93-4050-9263-A50C2B308C41_w500.jpg',
        order: 16,
      },
      {
        id: 1534795,
        photoTitle: 'Nepalese devotees pull ropes tied to the chariot of Hindu god Bhairava during the Biska Jatra Festival in Bhaktapur, Nepal. (AP/Niranjan Shrestha)',
        photoDescription: '',
        tiny: 'https://gdb.rferl.org/47DA6459-CDD1-40B2-8415-831118D22910_w125.jpg',
        hero: 'https://gdb.rferl.org/47DA6459-CDD1-40B2-8415-831118D22910_w500.jpg',
        order: 17,
      },
    ],
  }
}

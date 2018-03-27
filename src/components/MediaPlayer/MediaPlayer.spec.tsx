
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import MediaPlayer, { Props } from './MediaPlayer'

jest.mock('../ResilientImage')

describe('<MediaPlayer />', () => {
  describe('shapshots', () => {
    it('should render with the given src', () => {
      const element = create((
        <MediaPlayer src='mySrc' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given className', () => {
      const element = create((
        <MediaPlayer src='mySrc' className='myClass' />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with the given style', () => {
      const element = create((
        <MediaPlayer src='mySrc' style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with autoplay if prop is set to true', () => {
      const element = create((
        <MediaPlayer src='mySrc' autoPlay />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with controls if prop is set to true', () => {
      const element = create((
        <MediaPlayer src='mySrc' controls />
      ))

      expect(element).toMatchSnapshot()
    })

    it('should render with an audio element if audio prop is set to true', () => {
      const element = create((
        <MediaPlayer src='mySrc' audio />
      ))

      expect(element).toMatchSnapshot()
    })
  })

  describe('onTogglePlay', () => {
    it('should be called with true whenever the video starts playing', () => {
      const expected = true
      const onTogglePlay = jest.fn()

      const item = shallow((
        <MediaPlayer src='mySrc' onTogglePlay={onTogglePlay} />
      ))

      item.find('video').simulate('playing')

      expect(onTogglePlay).toHaveBeenCalledTimes(1)
      expect(onTogglePlay).toHaveBeenCalledWith(expected)
    })

    it('should be called with false whenever the video is paused', () => {
      const expected = false
      const onTogglePlay = jest.fn()

      const item = shallow((
        <MediaPlayer src='mySrc' onTogglePlay={onTogglePlay} />
      ))

      item.find('video').simulate('pause')

      expect(onTogglePlay).toHaveBeenCalledTimes(1)
      expect(onTogglePlay).toHaveBeenCalledWith(expected)
    })

    it('should not throw an error if not provided when the video is played or paused', () => {
      const item = shallow((
        <MediaPlayer src='mySrc' />
      ))

      item.find('video').simulate('play')
      item.find('video').simulate('pause')
    })

    it('should be called each time video is played or paused', () => {
      const playCount = 3
      const pauseCount = 2
      const expected = playCount + pauseCount
      const onTogglePlay = jest.fn()

      const item = shallow((
        <MediaPlayer src='mySrc' onTogglePlay={onTogglePlay} />
      ))

      const video = item.find('video')

      for (let i = 0; i < playCount; i++) {
        video.simulate('playing')
      }
      for (let i = 0; i < pauseCount; i++) {
        video.simulate('pause')
      }

      expect(onTogglePlay).toHaveBeenCalledTimes(expected)
    })
  })

  describe('playbackRate', () => {
    it('should update the embedded video playbackRate whenever the prop is changed', () => {
      const expected = 1.5

      const item = shallow<Props>((
        <MediaPlayer src='mySrc' />
      ))

      const mediaPlayer = item.instance() as MediaPlayer
      mediaPlayer.player = {
        playbackRate: 1,
      } as any

      item.setProps({ playbackRate: expected })

      expect(mediaPlayer.player.playbackRate).toEqual(expected)
    })
  })

  describe('togglePlay', () => {
    it('should call play on the player if true is passed in', () => {
      const play = jest.fn(() => Promise.resolve())
      const pause = jest.fn(() => null)

      const item = shallow<Props>((
        <MediaPlayer src='mySrc' />
      ))

      const mediaPlayer = item.instance() as MediaPlayer
      mediaPlayer.player = {
        play,
        pause,
      } as any

      mediaPlayer.togglePlay(true)

      expect(play).toHaveBeenCalledTimes(1)
      expect(pause).toHaveBeenCalledTimes(0)
    })

    it('should call pause on the player if false is passed in', () => {
      const play = jest.fn(() => Promise.resolve())
      const pause = jest.fn(() => null)

      const item = shallow<Props>((
        <MediaPlayer src='mySrc' />
      ))

      const mediaPlayer = item.instance() as MediaPlayer
      mediaPlayer.player = {
        play,
        pause,
      } as any

      mediaPlayer.togglePlay(false)

      expect(play).toHaveBeenCalledTimes(0)
      expect(pause).toHaveBeenCalledTimes(1)
    })

    it('should call play on the player if player is paused and nothing passed in', () => {
      const play = jest.fn(() => Promise.resolve())
      const pause = jest.fn(() => null)

      const item = shallow<Props>((
        <MediaPlayer src='mySrc' />
      ))

      const mediaPlayer = item.instance() as MediaPlayer
      mediaPlayer.player = {
        paused: true,
        play,
        pause,
      } as any

      mediaPlayer.togglePlay()

      expect(play).toHaveBeenCalledTimes(1)
      expect(pause).toHaveBeenCalledTimes(0)
    })

    it('should call pause on the player if player is not paused and nothing passed in', () => {
      const play = jest.fn(() => Promise.resolve())
      const pause = jest.fn(() => null)

      const item = shallow<Props>((
        <MediaPlayer src='mySrc' />
      ))

      const mediaPlayer = item.instance() as MediaPlayer
      mediaPlayer.player = {
        paused: false,
        play,
        pause,
      } as any

      mediaPlayer.togglePlay()

      expect(play).toHaveBeenCalledTimes(0)
      expect(pause).toHaveBeenCalledTimes(1)
    })
  })
})

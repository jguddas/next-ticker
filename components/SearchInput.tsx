import React from 'react'
import { x } from '@xstyled/styled-components'
import { useLayer } from 'react-laag'
import { useCombobox } from 'downshift'
import { motion, AnimatePresence } from 'framer-motion'
import Input from './Input'

interface Props extends React.ComponentProps<typeof x.div> {
  items: string[]
  title: string
}

export default ({ items, title, ...props }: Props): JSX.Element => {
  const [inputItems, setInputItems] = React.useState(items)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue!.toLowerCase())
        )
      )
    },
  })

  const showMenu = isOpen && inputItems.length > 0

  const { renderLayer, triggerProps, layerProps, triggerBounds } = useLayer({
    isOpen: showMenu,
    overflowContainer: false,
    auto: true,
    snap: true,
    placement: 'bottom-start',
    possiblePlacements: ['top-start', 'bottom-start'],
    triggerOffset: 0,
    containerOffset: 16,
  })

  return (
    <x.div {...getComboboxProps()} width="100%" flex="1" {...props}>
      <Input
        title={title}
        inputProps={{
          ...getInputProps(triggerProps),
          ...(!!isOpen && { boxShadow: 'inputFocus' }),
        }}
      />
      {renderLayer(
        <AnimatePresence>
          {showMenu && (
            <motion.ul
              {...getMenuProps(layerProps)}
              style={{
                ...getMenuProps(layerProps).style,
                width: triggerBounds.width,
              }}
              initial={{ opacity: 0, scaleY: 0.75 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.75 }}
              transition={{ duration: 0.125 }}
            >
              {inputItems.map((item, index) => (
                <x.li
                  key={item}
                  px={5}
                  py={4}
                  bg="dropdownBackground"
                  {...(index === highlightedIndex && {
                    bg: 'dropdownSelectedElementBackground',
                    color: 'dropdownSelectedElement',
                  })}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </x.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </x.div>
  )
}

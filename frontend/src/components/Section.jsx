import './Section.css'

export const SectionOverlay = ({ children, className, header, sectionTitle }) => {
  return (
    <section className={`section-container ${className ?? ''}`}>
      <div className="section-content">
        <header>
          {header ?? <h2>{sectionTitle}</h2>}
        </header>
        <hr />
        {children}
      </div>
    </section>
  )
}

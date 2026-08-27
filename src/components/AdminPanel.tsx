import { useState } from "react"
import type {
  HomeHero,
  HomePhoto,
  ClotheslinePhoto,
  ComebackEra,
  HobbySection,
  MomentPhoto,
  MemberLetter,
  BoardMessage,
  JiwooQuiz,
  QuizQuestion,
  QuizResultRange,
} from "../data"

interface AdminPanelProps {
  homeHero: HomeHero
  homePhotos: HomePhoto[]
  predebutPhotos: ClotheslinePhoto[]
  comebacks: ComebackEra[]
  hobbySections: HobbySection[]
  momentPhotos: MomentPhoto[]
  memberLetters: MemberLetter[]
  hachuBoardMessages: BoardMessage[]
  jiwooQuiz: JiwooQuiz
  onUpdateHomeHero: (next: HomeHero) => void
  onUpdateHomePhotos: (next: HomePhoto[]) => void
  onUpdatePredebutPhotos: (next: ClotheslinePhoto[]) => void
  onUpdateComebacks: (next: ComebackEra[]) => void
  onUpdateHobbySections: (next: HobbySection[]) => void
  onUpdateMomentPhotos: (next: MomentPhoto[]) => void
  onUpdateMemberLetters: (next: MemberLetter[]) => void
  onUpdateBoardMessages: (next: BoardMessage[]) => void
  onUpdateJiwooQuiz: (next: JiwooQuiz) => void
  onLogout: () => void
  onSave?: () => void
}

const tabs = [
  { id: "home", label: "Home" },
  { id: "predebut", label: "Pre-Debut" },
  { id: "comebacks", label: "Comebacks" },
  { id: "moments", label: "Moments" },
  { id: "letters", label: "Letters" },
  { id: "board", label: "Board" },
  { id: "quiz", label: "Quiz" },
  { id: "profile", label: "Jiwoo's Room" },
]

function fieldStyle() {
  return {
    width: "100%",
    minWidth: "0",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #dcd6c9",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
  } as const
}

function deleteButtonStyle() {
  return {
    width: "fit-content",
    border: "1px solid #d7aaa3",
    borderRadius: "999px",
    background: "#fff4f1",
    color: "#9a4036",
    padding: "8px 16px",
    cursor: "pointer",
  } as const
}

function sectionBox(children: React.ReactNode) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ebe3d6",
        borderRadius: "18px",
        padding: "18px",
        display: "grid",
        gap: "14px",
        marginBottom: "18px",
      }}
    >
      {children}
    </div>
  )
}

export default function AdminPanel({
  homeHero,
  homePhotos,
  predebutPhotos,
  comebacks,
  hobbySections,
  momentPhotos,
  memberLetters,
  hachuBoardMessages,
  jiwooQuiz,
  onUpdateHomeHero,
  onUpdateHomePhotos,
  onUpdatePredebutPhotos,
  onUpdateComebacks,
  onUpdateHobbySections,
  onUpdateMomentPhotos,
  onUpdateMemberLetters,
  onUpdateBoardMessages,
  onUpdateJiwooQuiz,
  onLogout,
  onSave,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("home")

  const updateHomePhoto = (
    index: number,
    changes: Partial<HomePhoto>,
  ) => {
    const next = [...homePhotos]
    next[index] = { ...next[index], ...changes }
    onUpdateHomePhotos(next)
  }

  const updateHomePhotoStyle = (
    index: number,
    key: keyof HomePhoto["style"],
    value: string,
  ) => {
    const next = [...homePhotos]
    next[index] = {
      ...next[index],
      style: { ...next[index].style, [key]: value },
    }
    onUpdateHomePhotos(next)
  }

  const updatePredebutPhoto = (
    index: number,
    changes: Partial<ClotheslinePhoto>,
  ) => {
    const next = [...predebutPhotos]
    next[index] = { ...next[index], ...changes }
    onUpdatePredebutPhotos(next)
  }

  const updateComeback = (
    index: number,
    changes: Partial<ComebackEra>,
  ) => {
    const next = [...comebacks]
    next[index] = { ...next[index], ...changes }
    onUpdateComebacks(next)
  }

  const updateComebackPhoto = (
    eraIndex: number,
    photoIndex: number,
    changes: Partial<ClotheslinePhoto>,
  ) => {
    const next = [...comebacks]
    const era = { ...next[eraIndex] }
    const photos = [...era.photos]
    photos[photoIndex] = { ...photos[photoIndex], ...changes }
    era.photos = photos
    next[eraIndex] = era
    onUpdateComebacks(next)
  }

  const updateSection = (
    index: number,
    changes: Partial<HobbySection>,
  ) => {
    const next = [...hobbySections]
    next[index] = { ...next[index], ...changes }
    onUpdateHobbySections(next)
  }

  const updateSectionItem = (
    sectionIndex: number,
    itemIndex: number,
    changes: Partial<HobbySection["items"][number]>,
  ) => {
    const next = [...hobbySections]
    const section = { ...next[sectionIndex] }
    const items = [...section.items]
    items[itemIndex] = { ...items[itemIndex], ...changes }
    section.items = items
    next[sectionIndex] = section
    onUpdateHobbySections(next)
  }

  const updateMomentPhoto = (index: number, changes: Partial<MomentPhoto>) => {
    const next = [...momentPhotos]
    next[index] = { ...next[index], ...changes }
    onUpdateMomentPhotos(next)
  }

  const updateLetter = (index: number, changes: Partial<MemberLetter>) => {
    const next = [...memberLetters]
    next[index] = { ...next[index], ...changes }
    onUpdateMemberLetters(next)
  }

  const updateBoardMessage = (index: number, changes: Partial<BoardMessage>) => {
    const next = [...hachuBoardMessages]
    next[index] = { ...next[index], ...changes }
    onUpdateBoardMessages(next)
  }

  const updateQuizQuestion = (index: number, changes: Partial<QuizQuestion>) => {
    const next = { ...jiwooQuiz, questions: [...jiwooQuiz.questions] }
    next.questions[index] = { ...next.questions[index], ...changes }
    onUpdateJiwooQuiz(next)
  }

  const updateQuizQuestionOption = (questionIndex: number, optionIndex: number, changes: Partial<QuizQuestion["options"][number]>) => {
    const next = { ...jiwooQuiz, questions: [...jiwooQuiz.questions] }
    next.questions[questionIndex] = {
      ...next.questions[questionIndex],
      options: [...next.questions[questionIndex].options],
    }
    next.questions[questionIndex].options[optionIndex] = {
      ...next.questions[questionIndex].options[optionIndex],
      ...changes,
    }
    onUpdateJiwooQuiz(next)
  }

  const updateQuizResultRange = (index: number, changes: Partial<QuizResultRange>) => {
    const next = { ...jiwooQuiz, resultRanges: [...jiwooQuiz.resultRanges] }
    next.resultRanges[index] = { ...next.resultRanges[index], ...changes }
    onUpdateJiwooQuiz(next)
  }

  const updateQuizMeme = (rangeIndex: number, memeIndex: number, changes: Partial<QuizResultRange["memePool"][number]>) => {
    const next = { ...jiwooQuiz, resultRanges: [...jiwooQuiz.resultRanges] }
    next.resultRanges[rangeIndex] = {
      ...next.resultRanges[rangeIndex],
      memePool: [...next.resultRanges[rangeIndex].memePool],
    }
    next.resultRanges[rangeIndex].memePool[memeIndex] = {
      ...next.resultRanges[rangeIndex].memePool[memeIndex],
      ...changes,
    }
    onUpdateJiwooQuiz(next)
  }

  const confirmDelete = (label: string) =>
    window.confirm(`Hapus ${label}? Perubahan akan berlaku setelah disimpan.`)

  const deleteHomePhoto = (index: number) => {
    if (confirmDelete("foto home ini")) onUpdateHomePhotos(homePhotos.filter((_, itemIndex) => itemIndex !== index))
  }

  const deletePredebutPhoto = (index: number) => {
    if (confirmDelete("foto pre-debut ini")) onUpdatePredebutPhotos(predebutPhotos.filter((_, itemIndex) => itemIndex !== index))
  }

  const deleteComeback = (index: number) => {
    if (confirmDelete("era comeback ini")) onUpdateComebacks(comebacks.filter((_, itemIndex) => itemIndex !== index))
  }

  const deleteComebackPhoto = (eraIndex: number, photoIndex: number) => {
    if (!confirmDelete("foto comeback ini")) return
    const next = [...comebacks]
    next[eraIndex] = { ...next[eraIndex], photos: next[eraIndex].photos.filter((_, itemIndex) => itemIndex !== photoIndex) }
    onUpdateComebacks(next)
  }

  const deleteMomentPhoto = (index: number) => {
    if (confirmDelete("foto momen ini")) onUpdateMomentPhotos(momentPhotos.filter((_, itemIndex) => itemIndex !== index))
  }

  const deleteLetter = (index: number) => {
    if (confirmDelete("surat ini")) onUpdateMemberLetters(memberLetters.filter((_, itemIndex) => itemIndex !== index))
  }

  const deleteBoardMessage = (index: number) => {
    if (confirmDelete("pesan board ini")) onUpdateBoardMessages(hachuBoardMessages.filter((_, itemIndex) => itemIndex !== index))
  }

  const deleteQuizQuestion = (index: number) => {
    if (!confirmDelete("pertanyaan quiz ini")) return
    onUpdateJiwooQuiz({ ...jiwooQuiz, questions: jiwooQuiz.questions.filter((_, itemIndex) => itemIndex !== index) })
  }

  const deleteQuizOption = (questionIndex: number, optionIndex: number) => {
    if (!confirmDelete("opsi jawaban ini")) return
    const next = { ...jiwooQuiz, questions: [...jiwooQuiz.questions] }
    next.questions[questionIndex] = {
      ...next.questions[questionIndex],
      options: next.questions[questionIndex].options.filter((_, itemIndex) => itemIndex !== optionIndex),
    }
    onUpdateJiwooQuiz(next)
  }

  const deleteQuizResultRange = (index: number) => {
    if (confirmDelete("rentang hasil quiz ini")) onUpdateJiwooQuiz({ ...jiwooQuiz, resultRanges: jiwooQuiz.resultRanges.filter((_, itemIndex) => itemIndex !== index) })
  }

  const deleteQuizMeme = (rangeIndex: number, memeIndex: number) => {
    if (!confirmDelete("meme quiz ini")) return
    const next = { ...jiwooQuiz, resultRanges: [...jiwooQuiz.resultRanges] }
    next.resultRanges[rangeIndex] = {
      ...next.resultRanges[rangeIndex],
      memePool: next.resultRanges[rangeIndex].memePool.filter((_, itemIndex) => itemIndex !== memeIndex),
    }
    onUpdateJiwooQuiz(next)
  }

  const deleteHobbySection = (index: number) => {
    if (confirmDelete("kartu room ini")) onUpdateHobbySections(hobbySections.filter((_, itemIndex) => itemIndex !== index))
  }

  const deleteHobbyItem = (sectionIndex: number, itemIndex: number) => {
    if (!confirmDelete("item ini")) return
    const next = [...hobbySections]
    next[sectionIndex] = { ...next[sectionIndex], items: next[sectionIndex].items.filter((_, currentIndex) => currentIndex !== itemIndex) }
    onUpdateHobbySections(next)
  }

  return (
    <section
      style={{
        background: "rgba(255,255,250,0.95)",
        border: "1px solid rgba(160,145,110,0.25)",
        borderRadius: "24px",
        padding: "24px",
        margin: "96px 32px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            Admin Panel
          </div>
          <div style={{ color: "rgba(30,26,22,0.55)", fontSize: "13px" }}>
            Edit live content and add new items for the homepage, comeback eras, and Jiwoo&apos;s room.
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => onSave?.()}
            style={{
              border: "1px solid #c6b79b",
              borderRadius: "999px",
              background: "#eef4ea",
              padding: "10px 18px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Simpan
          </button>

          <button
            type="button"
            onClick={onLogout}
            style={{
              border: "1px solid #c6b79b",
              borderRadius: "999px",
              background: "#fff",
              padding: "10px 18px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 16px",
              borderRadius: "999px",
              border:
                activeTab === tab.id ? "1px solid #b8c8b0" : "1px solid transparent",
              background: activeTab === tab.id ? "#eef4ea" : "transparent",
              color: activeTab === tab.id ? "#3a5030" : "rgba(30,26,22,0.48)",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: "13px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "home" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {sectionBox(
            <>
              <div style={{ fontWeight: 600 }}>Front page content</div>
              <div
                style={{
                  display: "grid",
                  gap: "14px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                }}
              >
                <label style={{ display: "grid", gap: "8px" }}>
                  Front photo URL
                  <input
                    style={fieldStyle()}
                    value={homeHero.src}
                    onChange={(event) =>
                      onUpdateHomeHero({ ...homeHero, src: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Front photo alt text
                  <input
                    style={fieldStyle()}
                    value={homeHero.alt}
                    onChange={(event) =>
                      onUpdateHomeHero({ ...homeHero, alt: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Name accent
                  <input
                    style={fieldStyle()}
                    value={homeHero.nameAccent}
                    onChange={(event) =>
                      onUpdateHomeHero({ ...homeHero, nameAccent: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Role line
                  <input
                    style={fieldStyle()}
                    value={homeHero.roleLine}
                    onChange={(event) =>
                      onUpdateHomeHero({ ...homeHero, roleLine: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Quote
                  <textarea
                    rows={3}
                    style={{ ...fieldStyle(), resize: "vertical" }}
                    value={homeHero.quote}
                    onChange={(event) =>
                      onUpdateHomeHero({ ...homeHero, quote: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Scroll button label
                  <input
                    style={fieldStyle()}
                    value={homeHero.scrollLabel}
                    onChange={(event) =>
                      onUpdateHomeHero({ ...homeHero, scrollLabel: event.target.value })
                    }
                  />
                </label>
              </div>
            </>
          )}

          {sectionBox(
            <>
              <div style={{ fontWeight: 600, marginBottom: "10px" }}>
                Scattered home photos
              </div>
              {homePhotos.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e6dcc9",
                    borderRadius: "16px",
                    padding: "14px",
                    display: "grid",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    }}
                  >
                    <label style={{ display: "grid", gap: "8px" }}>
                      Image URL
                      <input
                        style={fieldStyle()}
                        value={photo.src}
                        onChange={(event) =>
                          updateHomePhoto(index, { src: event.target.value })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Alt text
                      <input
                        style={fieldStyle()}
                        value={photo.alt}
                        onChange={(event) =>
                          updateHomePhoto(index, { alt: event.target.value })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Width
                      <input
                        style={fieldStyle()}
                        value={photo.style.width}
                        onChange={(event) =>
                          updateHomePhotoStyle(index, "width", event.target.value)
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Rotate
                      <input
                        style={fieldStyle()}
                        value={photo.style.rotate}
                        onChange={(event) =>
                          updateHomePhotoStyle(index, "rotate", event.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    }}
                  >
                    <label style={{ display: "grid", gap: "8px" }}>
                      Top
                      <input
                        style={fieldStyle()}
                        value={photo.style.top ?? ""}
                        onChange={(event) =>
                          updateHomePhotoStyle(index, "top", event.target.value)
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Left
                      <input
                        style={fieldStyle()}
                        value={photo.style.left ?? ""}
                        onChange={(event) =>
                          updateHomePhotoStyle(index, "left", event.target.value)
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Right
                      <input
                        style={fieldStyle()}
                        value={photo.style.right ?? ""}
                        onChange={(event) =>
                          updateHomePhotoStyle(index, "right", event.target.value)
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Bottom
                      <input
                        style={fieldStyle()}
                        value={photo.style.bottom ?? ""}
                        onChange={(event) =>
                          updateHomePhotoStyle(index, "bottom", event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <button type="button" onClick={() => deleteHomePhoto(index)} style={deleteButtonStyle()}>
                    Hapus foto home
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  onUpdateHomePhotos([
                    ...homePhotos,
                    {
                      src: "",
                      alt: "",
                      rotate: 0,
                      noteKr: "",
                      noteText: "",
                      noteColor: "#f7f4ed",
                      year: "",
                      label: "",
                      style: {
                        top: "10%",
                        left: "3%",
                        rotate: "0deg",
                        width: "120px",
                      },
                    },
                  ])
                }
                style={{
                  width: "fit-content",
                  border: "1px solid #c4d4bc",
                  borderRadius: "999px",
                  background: "#eef4ea",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Add home photo
              </button>
            </>
          )}
        </div>
      )}

      {activeTab === "predebut" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {sectionBox(
            <>
              <div style={{ fontWeight: 600 }}>Edit pre-debut photos</div>
              {predebutPhotos.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e6dcc9",
                    borderRadius: "16px",
                    padding: "16px",
                    display: "grid",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    }}
                  >
                    <label style={{ display: "grid", gap: "8px" }}>
                      Image URL
                      <input
                        style={fieldStyle()}
                        value={photo.src}
                        onChange={(event) =>
                          updatePredebutPhoto(index, { src: event.target.value })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Alt text
                      <input
                        style={fieldStyle()}
                        value={photo.alt}
                        onChange={(event) =>
                          updatePredebutPhoto(index, { alt: event.target.value })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Rotate
                      <input
                        style={fieldStyle()}
                        value={photo.rotate}
                        onChange={(event) =>
                          updatePredebutPhoto(index, {
                            rotate: Number(event.target.value) || 0,
                          })
                        }
                      />
                    </label>
                  </div>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Korean caption
                    <input
                      style={fieldStyle()}
                      value={photo.noteKr}
                      onChange={(event) =>
                        updatePredebutPhoto(index, { noteKr: event.target.value })
                      }
                    />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Note text
                    <textarea
                      rows={2}
                      style={{ ...fieldStyle(), resize: "vertical" }}
                      value={photo.noteText}
                      onChange={(event) =>
                        updatePredebutPhoto(index, { noteText: event.target.value })
                      }
                    />
                  </label>
                  <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Note color
                      <input
                        style={fieldStyle()}
                        value={photo.noteColor}
                        onChange={(event) =>
                          updatePredebutPhoto(index, { noteColor: event.target.value })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Year
                      <input
                        style={fieldStyle()}
                        value={photo.year}
                        onChange={(event) =>
                          updatePredebutPhoto(index, { year: event.target.value })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Label
                      <input
                        style={fieldStyle()}
                        value={photo.label}
                        onChange={(event) =>
                          updatePredebutPhoto(index, { label: event.target.value })
                        }
                      />
                    </label>
                  </div>
                  <button type="button" onClick={() => deletePredebutPhoto(index)} style={deleteButtonStyle()}>
                    Hapus foto pre-debut
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  onUpdatePredebutPhotos([
                    ...predebutPhotos,
                    {
                      src: "",
                      alt: "",
                      rotate: 0,
                      noteKr: "",
                      noteText: "",
                      noteColor: "#f7f4ed",
                      year: "",
                      label: "",
                    },
                  ])
                }
                style={{
                  width: "fit-content",
                  border: "1px solid #c4d4bc",
                  borderRadius: "999px",
                  background: "#eef4ea",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Add pre-debut photo
              </button>
            </>
          )}
        </div>
      )}

      {activeTab === "comebacks" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "22px" }}>
          {comebacks.map((era, eraIndex) => (
            <div
              key={era.id}
              style={{
                border: "1px solid #e6dcc9",
                borderRadius: "18px",
                padding: "18px",
              }}
            >
              <div style={{ display: "grid", gap: "12px", marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 600 }}>Era {eraIndex + 1}</div>
                  <button type="button" onClick={() => deleteComeback(eraIndex)} style={deleteButtonStyle()}>
                    Hapus era
                  </button>
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  }}
                >
                  <label style={{ display: "grid", gap: "8px" }}>
                    Era ID
                    <input
                      style={fieldStyle()}
                      value={era.id}
                      onChange={(event) =>
                        updateComeback(eraIndex, { id: event.target.value })
                      }
                    />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Title
                    <input
                      style={fieldStyle()}
                      value={era.title}
                      onChange={(event) =>
                        updateComeback(eraIndex, { title: event.target.value })
                      }
                    />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Year
                    <input
                      style={fieldStyle()}
                      value={era.year}
                      onChange={(event) =>
                        updateComeback(eraIndex, { year: event.target.value })
                      }
                    />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Type
                    <input
                      style={fieldStyle()}
                      value={era.type}
                      onChange={(event) =>
                        updateComeback(eraIndex, { type: event.target.value })
                      }
                    />
                  </label>
                </div>
                <label style={{ display: "grid", gap: "8px" }}>
                  Tagline
                  <textarea
                    rows={2}
                    style={{ ...fieldStyle(), resize: "vertical" }}
                    value={era.tagline}
                    onChange={(event) =>
                      updateComeback(eraIndex, { tagline: event.target.value })
                    }
                  />
                </label>
              </div>

              <div style={{ display: "grid", gap: "14px" }}>
                {era.photos.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    style={{
                      border: "1px solid #ece2d4",
                      borderRadius: "16px",
                      padding: "14px",
                      display: "grid",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>Comeback photo {photoIndex + 1}</div>
                    <div
                      style={{
                        display: "grid",
                        gap: "12px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      }}
                    >
                      <label style={{ display: "grid", gap: "8px" }}>
                    <button type="button" onClick={() => deleteComebackPhoto(eraIndex, photoIndex)} style={deleteButtonStyle()}>
                      Hapus foto comeback
                    </button>
                        Image URL
                        <input
                          style={fieldStyle()}
                          value={photo.src}
                          onChange={(event) =>
                            updateComebackPhoto(eraIndex, photoIndex, {
                              src: event.target.value,
                            })
                          }
                        />
                      </label>
                      <label style={{ display: "grid", gap: "8px" }}>
                        Alt text
                        <input
                          style={fieldStyle()}
                          value={photo.alt}
                          onChange={(event) =>
                            updateComebackPhoto(eraIndex, photoIndex, {
                              alt: event.target.value,
                            })
                          }
                        />
                      </label>
                      <label style={{ display: "grid", gap: "8px" }}>
                        Rotate
                        <input
                          style={fieldStyle()}
                          value={photo.rotate}
                          onChange={(event) =>
                            updateComebackPhoto(eraIndex, photoIndex, {
                              rotate: Number(event.target.value) || 0,
                            })
                          }
                        />
                      </label>
                    </div>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Korean caption
                      <input
                        style={fieldStyle()}
                        value={photo.noteKr}
                        onChange={(event) =>
                          updateComebackPhoto(eraIndex, photoIndex, {
                            noteKr: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Note text
                      <textarea
                        rows={2}
                        style={{ ...fieldStyle(), resize: "vertical" }}
                        value={photo.noteText}
                        onChange={(event) =>
                          updateComebackPhoto(eraIndex, photoIndex, {
                            noteText: event.target.value,
                          })
                        }
                      />
                    </label>
                    <div
                      style={{
                        display: "grid",
                        gap: "12px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      }}
                    >
                      <label style={{ display: "grid", gap: "8px" }}>
                        Note color
                        <input
                          style={fieldStyle()}
                          value={photo.noteColor}
                          onChange={(event) =>
                            updateComebackPhoto(eraIndex, photoIndex, {
                              noteColor: event.target.value,
                            })
                          }
                        />
                      </label>
                      <label style={{ display: "grid", gap: "8px" }}>
                        Year
                        <input
                          style={fieldStyle()}
                          value={photo.year}
                          onChange={(event) =>
                            updateComebackPhoto(eraIndex, photoIndex, {
                              year: event.target.value,
                            })
                          }
                        />
                      </label>
                      <label style={{ display: "grid", gap: "8px" }}>
                        Label
                        <input
                          style={fieldStyle()}
                          value={photo.label}
                          onChange={(event) =>
                            updateComebackPhoto(eraIndex, photoIndex, {
                              label: event.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    updateComeback(eraIndex, {
                      photos: [
                        ...era.photos,
                        {
                          src: "",
                          alt: "",
                          rotate: 0,
                          noteKr: "",
                          noteText: "",
                          noteColor: "#f7f4ed",
                          year: "",
                          label: "",
                        },
                      ],
                    })
                  }
                  style={{
                    width: "fit-content",
                    border: "1px solid #c4d4bc",
                    borderRadius: "999px",
                    background: "#eef4ea",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  Add comeback photo
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onUpdateComebacks([
                ...comebacks,
                {
                  id: `era-${Date.now()}`,
                  title: "New Era",
                  year: "2026",
                  type: "Single",
                  tagline: "",
                  photos: [],
                },
              ])
            }
            style={{
              width: "fit-content",
              border: "1px solid #c4d4bc",
              borderRadius: "999px",
              background: "#eef4ea",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Add comeback era
          </button>
        </div>
      )}

      {activeTab === "moments" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {sectionBox(
            <>
              <div style={{ fontWeight: 600 }}>Jiwoo & member moment photos</div>
              {momentPhotos.map((photo, index) => (
                <div key={photo.id || index} style={{ border: "1px solid #e6dcc9", borderRadius: "16px", padding: "16px", display: "grid", gap: "12px" }}>
                  <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Image URL
                      <input style={fieldStyle()} value={photo.src} onChange={(event) => updateMomentPhoto(index, { src: event.target.value })} />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Alt text
                      <input style={fieldStyle()} value={photo.alt} onChange={(event) => updateMomentPhoto(index, { alt: event.target.value })} />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Year
                      <input style={fieldStyle()} value={photo.year} onChange={(event) => updateMomentPhoto(index, { year: event.target.value })} />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Member / group
                      <input style={fieldStyle()} value={photo.member} onChange={(event) => updateMomentPhoto(index, { member: event.target.value })} />
                    </label>
                  </div>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Caption
                    <input style={fieldStyle()} value={photo.caption} onChange={(event) => updateMomentPhoto(index, { caption: event.target.value })} />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Note
                    <textarea rows={3} style={{ ...fieldStyle(), resize: "vertical" }} value={photo.note} onChange={(event) => updateMomentPhoto(index, { note: event.target.value })} />
                  </label>
                  <button type="button" onClick={() => deleteMomentPhoto(index)} style={deleteButtonStyle()}>
                    Hapus foto momen
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => onUpdateMomentPhotos([...momentPhotos, { id: `moment-${Date.now()}`, src: "", alt: "", year: "2026", caption: "New moment", note: "", member: "Heart2Heart" }])} style={{ width: "fit-content", border: "1px solid #c4d4bc", borderRadius: "999px", background: "#eef4ea", padding: "8px 16px", cursor: "pointer" }}>
                Add moment photo
              </button>
            </>
          )}
        </div>
      )}

      {activeTab === "letters" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {sectionBox(
            <>
              <div style={{ fontWeight: 600 }}>Letter from members to Jiwoo (per year)</div>
              {memberLetters.map((letter, index) => (
                <div key={letter.id || index} style={{ border: "1px solid #e6dcc9", borderRadius: "16px", padding: "16px", display: "grid", gap: "12px" }}>
                  <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Year
                      <input style={fieldStyle()} value={letter.year} onChange={(event) => updateLetter(index, { year: event.target.value })} />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Writer
                      <input style={fieldStyle()} value={letter.from} onChange={(event) => updateLetter(index, { from: event.target.value })} />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      To
                      <input style={fieldStyle()} value={letter.to} onChange={(event) => updateLetter(index, { to: event.target.value })} />
                    </label>
                  </div>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Title
                    <input style={fieldStyle()} value={letter.title} onChange={(event) => updateLetter(index, { title: event.target.value })} />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Message
                    <textarea rows={4} style={{ ...fieldStyle(), resize: "vertical" }} value={letter.message} onChange={(event) => updateLetter(index, { message: event.target.value })} />
                  </label>
                  <button type="button" onClick={() => deleteLetter(index)} style={deleteButtonStyle()}>
                    Hapus surat
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => onUpdateMemberLetters([...memberLetters, { id: `letter-${Date.now()}`, year: "2026", title: "New letter", from: "Member", to: "Jiwoo", message: "" }])} style={{ width: "fit-content", border: "1px solid #c4d4bc", borderRadius: "999px", background: "#eef4ea", padding: "8px 16px", cursor: "pointer" }}>
                Add member letter
              </button>
            </>
          )}
        </div>
      )}

      {activeTab === "board" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {sectionBox(
            <>
              <div style={{ fontWeight: 600 }}>Hachu's Board messages</div>
              {hachuBoardMessages.map((message, index) => (
                <div key={message.id || index} style={{ border: "1px solid #e6dcc9", borderRadius: "16px", padding: "16px", display: "grid", gap: "12px" }}>
                  <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Author
                      <input style={fieldStyle()} value={message.author} onChange={(event) => updateBoardMessage(index, { author: event.target.value })} />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Date
                      <input style={fieldStyle()} value={message.createdAt} onChange={(event) => updateBoardMessage(index, { createdAt: event.target.value })} />
                    </label>
                  </div>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Message
                    <textarea rows={4} style={{ ...fieldStyle(), resize: "vertical" }} value={message.message} onChange={(event) => updateBoardMessage(index, { message: event.target.value })} />
                  </label>
                  <button type="button" onClick={() => deleteBoardMessage(index)} style={deleteButtonStyle()}>
                    Hapus pesan
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => onUpdateBoardMessages([...hachuBoardMessages, { id: `board-${Date.now()}`, author: "Guest", message: "", createdAt: new Date().toISOString().slice(0, 10) }])} style={{ width: "fit-content", border: "1px solid #c4d4bc", borderRadius: "999px", background: "#eef4ea", padding: "8px 16px", cursor: "pointer" }}>
                Add board message
              </button>
            </>
          )}
        </div>
      )}

      {activeTab === "quiz" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {sectionBox(
            <>
              <div style={{ fontWeight: 600 }}>Quiz title and description</div>
              <label style={{ display: "grid", gap: "8px" }}>
                Title
                <input style={fieldStyle()} value={jiwooQuiz.title} onChange={(event) => onUpdateJiwooQuiz({ ...jiwooQuiz, title: event.target.value })} />
              </label>
              <label style={{ display: "grid", gap: "8px" }}>
                Description
                <textarea rows={3} style={{ ...fieldStyle(), resize: "vertical" }} value={jiwooQuiz.description} onChange={(event) => onUpdateJiwooQuiz({ ...jiwooQuiz, description: event.target.value })} />
              </label>
            </>
          )}

          {jiwooQuiz.questions.map((question, questionIndex) => (
            <div key={question.id} style={{ border: "1px solid #e6dcc9", borderRadius: "16px", padding: "16px", display: "grid", gap: "12px" }}>
              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <label style={{ display: "grid", gap: "8px" }}>
                  Question prompt
                  <input style={fieldStyle()} value={question.prompt} onChange={(event) => updateQuizQuestion(questionIndex, { prompt: event.target.value })} />
                </label>
              </div>
              {question.options.map((option, optionIndex) => (
                <div key={option.id} style={{ display: "grid", gap: "8px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Option label
                    <input style={fieldStyle()} value={option.label} onChange={(event) => updateQuizQuestionOption(questionIndex, optionIndex, { label: event.target.value })} />
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #e6dcc9", borderRadius: "10px", padding: "10px 12px", minHeight: "44px" }}>
                    <input type="checkbox" checked={option.isCorrect} onChange={(event) => updateQuizQuestionOption(questionIndex, optionIndex, { isCorrect: event.target.checked })} />
                    Correct answer
                  </label>
                  <button type="button" onClick={() => deleteQuizOption(questionIndex, optionIndex)} style={deleteButtonStyle()}>
                    Hapus opsi
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => deleteQuizQuestion(questionIndex)} style={deleteButtonStyle()}>
                Hapus pertanyaan
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => onUpdateJiwooQuiz({
              ...jiwooQuiz,
              questions: [
                ...jiwooQuiz.questions,
                {
                  id: `q-${Date.now()}`,
                  prompt: "New question",
                  options: [
                    { id: `q-${Date.now()}-a`, label: "Option A", isCorrect: true },
                    { id: `q-${Date.now()}-b`, label: "Option B", isCorrect: false },
                    { id: `q-${Date.now()}-c`, label: "Option C", isCorrect: false },
                    { id: `q-${Date.now()}-d`, label: "Option D", isCorrect: false },
                  ],
                },
              ],
            })}
            style={{ width: "fit-content", border: "1px solid #c4d4bc", borderRadius: "999px", background: "#eef4ea", padding: "8px 16px", cursor: "pointer" }}
          >
            Add question
          </button>

          {jiwooQuiz.resultRanges.map((range, rangeIndex) => (
            <div key={range.id} style={{ border: "1px solid #e6dcc9", borderRadius: "16px", padding: "16px", display: "grid", gap: "12px" }}>
              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <label style={{ display: "grid", gap: "8px" }}>
                  Min
                  <input style={fieldStyle()} type="number" value={range.min} onChange={(event) => updateQuizResultRange(rangeIndex, { min: Number(event.target.value) || 0 })} />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Max
                  <input style={fieldStyle()} type="number" value={range.max} onChange={(event) => updateQuizResultRange(rangeIndex, { max: Number(event.target.value) || 0 })} />
                </label>
              </div>
              <label style={{ display: "grid", gap: "8px" }}>
                Title
                <input style={fieldStyle()} value={range.title} onChange={(event) => updateQuizResultRange(rangeIndex, { title: event.target.value })} />
              </label>
              <label style={{ display: "grid", gap: "8px" }}>
                Message
                <textarea rows={3} style={{ ...fieldStyle(), resize: "vertical" }} value={range.message} onChange={(event) => updateQuizResultRange(rangeIndex, { message: event.target.value })} />
              </label>
              <label style={{ display: "grid", gap: "8px" }}>
                Certificate image URL
                <input style={fieldStyle()} value={range.certificateImage} onChange={(event) => updateQuizResultRange(rangeIndex, { certificateImage: event.target.value })} />
              </label>
              {range.memePool.map((meme, memeIndex) => (
                <div key={meme.id} style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Meme image URL
                    <input style={fieldStyle()} value={meme.src} onChange={(event) => updateQuizMeme(rangeIndex, memeIndex, { src: event.target.value })} />
                  </label>
                  <label style={{ display: "grid", gap: "8px" }}>
                    Meme alt text
                    <input style={fieldStyle()} value={meme.alt} onChange={(event) => updateQuizMeme(rangeIndex, memeIndex, { alt: event.target.value })} />
                  </label>
                  <button type="button" onClick={() => deleteQuizMeme(rangeIndex, memeIndex)} style={deleteButtonStyle()}>
                    Hapus meme
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => deleteQuizResultRange(rangeIndex)} style={deleteButtonStyle()}>
                Hapus rentang hasil
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "profile" && (
        <div style={{ marginTop: "22px", display: "grid", gap: "18px" }}>
          {hobbySections.map((section, sectionIndex) => (
            <div
              key={section.id}
              style={{
                border: "1px solid #e6dcc9",
                borderRadius: "18px",
                padding: "18px",
                display: "grid",
                gap: "14px",
              }}
            >
              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <label style={{ display: "grid", gap: "8px" }}>
                  Section icon
                  <input
                    style={fieldStyle()}
                    value={section.icon}
                    onChange={(event) =>
                      updateSection(sectionIndex, { icon: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Title
                  <input
                    style={fieldStyle()}
                    value={section.title}
                    onChange={(event) =>
                      updateSection(sectionIndex, { title: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Subtitle
                  <input
                    style={fieldStyle()}
                    value={section.subtitle}
                    onChange={(event) =>
                      updateSection(sectionIndex, { subtitle: event.target.value })
                    }
                  />
                </label>
              </div>
              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <label style={{ display: "grid", gap: "8px" }}>
                  Background
                  <input
                    style={fieldStyle()}
                    value={section.bg}
                    onChange={(event) =>
                      updateSection(sectionIndex, { bg: event.target.value })
                    }
                  />
                </label>
                <label style={{ display: "grid", gap: "8px" }}>
                  Border
                  <input
                    style={fieldStyle()}
                    value={section.border}
                    onChange={(event) =>
                      updateSection(sectionIndex, { border: event.target.value })
                    }
                  />
                </label>
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                <div style={{ fontWeight: 600 }}>Items</div>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ display: "grid", gap: "10px" }}>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Item name
                      <input
                        style={fieldStyle()}
                        value={item.name}
                        onChange={(event) =>
                          updateSectionItem(sectionIndex, itemIndex, {
                            name: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label style={{ display: "grid", gap: "8px" }}>
                      Item detail
                      <textarea
                        rows={2}
                        style={{ ...fieldStyle(), resize: "vertical" }}
                        value={item.detail}
                        onChange={(event) =>
                          updateSectionItem(sectionIndex, itemIndex, {
                            detail: event.target.value,
                          })
                        }
                      />
                    </label>
                    <button type="button" onClick={() => deleteHobbyItem(sectionIndex, itemIndex)} style={deleteButtonStyle()}>
                      Hapus item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateSection(sectionIndex, {
                      items: [
                        ...section.items,
                        { name: "", detail: "" },
                      ],
                    })
                  }
                  style={{
                    width: "fit-content",
                    border: "1px solid #c4d4bc",
                    borderRadius: "999px",
                    background: "#eef4ea",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  Add item
                </button>
              </div>
              <button type="button" onClick={() => deleteHobbySection(sectionIndex)} style={deleteButtonStyle()}>
                Hapus kartu room
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              onUpdateHobbySections([
                ...hobbySections,
                {
                  id: `section-${Date.now()}`,
                  icon: "🎀",
                  title: "New card",
                  subtitle: "New section",
                  bg: "#f7f4ed",
                  border: "#d6c8b2",
                  items: [{ name: "New detail", detail: "Describe this new card." }],
                },
              ])
            }
            style={{
              width: "fit-content",
              border: "1px solid #c4d4bc",
              borderRadius: "999px",
              background: "#eef4ea",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Add new room card
          </button>
        </div>
      )}
    </section>
  )
}
